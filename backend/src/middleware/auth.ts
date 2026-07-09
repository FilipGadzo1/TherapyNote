import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

const authService = new AuthService();

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ success: false, error: 'No token provided' });
    return;
  }

  try {
    req.user = authService.verifyAccessToken(token);
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
}
