import { Router, Request, Response } from 'express';
import multer from 'multer';
import { authMiddleware } from '../middleware/auth';
import { RecordingService } from '../services/RecordingService';

const router = Router();
const recordingService = new RecordingService();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.post(
  '/upload',
  authMiddleware,
  upload.single('audio'),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ success: false, error: 'No audio file provided' });
        return;
      }
      if (!req.user) {
        res.status(401).json({ success: false, error: 'Not authenticated' });
        return;
      }

      const durationSeconds = parseInt(req.body.durationSeconds) || 0;
      const recording = await recordingService.uploadRecording(
        req.user.userId,
        req.file.buffer,
        durationSeconds,
        req.file.mimetype
      );

      res.json({ success: true, data: recording });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
);

export default router;
