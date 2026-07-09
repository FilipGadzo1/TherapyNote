import { Router, Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const authService = new AuthService();

router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, error: 'Email and password required' });
      return;
    }
    const result = await authService.signup(email, password, firstName, lastName);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, error: 'Email and password required' });
      return;
    }
    const result = await authService.login(email, password);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.post('/verify-mfa', async (req: Request, res: Response) => {
  try {
    const { userId, code } = req.body;
    const result = await authService.verifyMFA(userId, code);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.post('/enable-mfa', authMiddleware, async (req: Request, res: Response) => {
  try {
    const result = await authService.enableMFA(req.user!.userId);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.post('/confirm-mfa', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    await authService.confirmMFA(req.user!.userId, code);
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.post('/refresh-token', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshAccessToken(refreshToken);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
