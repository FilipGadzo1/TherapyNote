import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import prisma from '../lib/prisma';
import { env } from '../config/env';

export class AuthService {
  async signup(email: string, password: string, firstName?: string, lastName?: string) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new Error('Email already registered');

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
      },
    });

    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    return { user: { id: user.id, email: user.email }, accessToken, refreshToken };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) throw new Error('Invalid password');

    if (user.mfaEnabled) {
      // Return flag indicating MFA required, don't issue tokens yet
      return { requiresMFA: true as const, userId: user.id };
    }

    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    return { user: { id: user.id, email: user.email }, accessToken, refreshToken };
  }

  async verifyMFA(userId: string, code: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.mfaSecret) throw new Error('MFA not enabled');

    const valid = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token: code,
      window: 1,
    });
    if (!valid) throw new Error('Invalid MFA code');

    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    return { user: { id: user.id, email: user.email }, accessToken, refreshToken };
  }

  async enableMFA(userId: string) {
    const secret = speakeasy.generateSecret({ name: 'TherapyNote' });
    const qrCode = await QRCode.toDataURL(secret.otpauth_url!);

    await prisma.user.update({
      where: { id: userId },
      data: { mfaSecret: secret.base32 },
    });

    return { secret: secret.base32, qrCode };
  }

  async confirmMFA(userId: string, code: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.mfaSecret) throw new Error('MFA setup not started');

    const valid = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token: code,
      window: 1,
    });
    if (!valid) throw new Error('Invalid MFA code');

    await prisma.user.update({
      where: { id: userId },
      data: { mfaEnabled: true },
    });
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, env.jwtSecret) as { userId: string };
      const accessToken = this.generateAccessToken(decoded.userId);
      return { accessToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  private generateAccessToken(userId: string): string {
    return jwt.sign({ userId }, env.jwtSecret, { expiresIn: '24h' });
  }

  private generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, env.jwtSecret, { expiresIn: '7d' });
  }

  verifyAccessToken(token: string): { userId: string } {
    return jwt.verify(token, env.jwtSecret) as { userId: string };
  }
}
