import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { AuthService } from '../src/services/AuthService';
import prisma from '../src/lib/prisma';

const EMAIL = 'vitest-auth@test.local';

async function cleanup() {
  await prisma.note.deleteMany({ where: { user: { email: EMAIL } } });
  await prisma.recording.deleteMany({ where: { user: { email: EMAIL } } });
  await prisma.user.deleteMany({ where: { email: EMAIL } });
}

describe('AuthService', () => {
  let authService: AuthService;

  beforeAll(async () => {
    authService = new AuthService();
    await cleanup();
  });

  afterEach(async () => {
    await cleanup();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('signup creates new user and returns tokens', async () => {
    const result = await authService.signup(EMAIL, 'password123');
    expect(result.user.email).toBe(EMAIL);
    expect(result.accessToken).toBeDefined();
    expect(result.refreshToken).toBeDefined();
  });

  test('signup rejects duplicate email', async () => {
    await authService.signup(EMAIL, 'password123');
    await expect(authService.signup(EMAIL, 'password456')).rejects.toThrow(
      'Email already registered'
    );
  });

  test('signup stores password as bcrypt hash, not plaintext', async () => {
    await authService.signup(EMAIL, 'password123');
    const user = await prisma.user.findUnique({ where: { email: EMAIL } });
    expect(user!.passwordHash).not.toContain('password123');
    expect(user!.passwordHash).toMatch(/^\$2[aby]\$/);
  });

  test('login returns tokens for valid credentials', async () => {
    await authService.signup(EMAIL, 'password123');
    const result = await authService.login(EMAIL, 'password123');
    expect('accessToken' in result && result.accessToken).toBeDefined();
  });

  test('login fails for invalid password', async () => {
    await authService.signup(EMAIL, 'password123');
    await expect(authService.login(EMAIL, 'wrongpassword')).rejects.toThrow('Invalid password');
  });

  test('login fails for unknown user', async () => {
    await expect(authService.login('nobody@test.local', 'password123')).rejects.toThrow(
      'User not found'
    );
  });

  test('login requires MFA when enabled', async () => {
    const { user } = await authService.signup(EMAIL, 'password123');
    await authService.enableMFA(user.id);
    await prisma.user.update({ where: { id: user.id }, data: { mfaEnabled: true } });

    const result = await authService.login(EMAIL, 'password123');
    expect(result).toEqual({ requiresMFA: true, userId: user.id });
  });

  test('verifyMFA rejects invalid code', async () => {
    const { user } = await authService.signup(EMAIL, 'password123');
    await authService.enableMFA(user.id);
    await expect(authService.verifyMFA(user.id, '000000')).rejects.toThrow('Invalid MFA code');
  });

  test('access token verifies and round-trips userId', async () => {
    const { user, accessToken } = await authService.signup(EMAIL, 'password123');
    const decoded = authService.verifyAccessToken(accessToken);
    expect(decoded.userId).toBe(user.id);
  });

  test('refreshAccessToken issues new access token', async () => {
    const { refreshToken, user } = await authService.signup(EMAIL, 'password123');
    const { accessToken } = await authService.refreshAccessToken(refreshToken);
    expect(authService.verifyAccessToken(accessToken).userId).toBe(user.id);
  });

  test('refreshAccessToken rejects garbage token', async () => {
    await expect(authService.refreshAccessToken('not-a-token')).rejects.toThrow(
      'Invalid refresh token'
    );
  });
});
