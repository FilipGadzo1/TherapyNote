import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import { NoteGenerationService } from '../services/NoteGenerationService';

const router = Router();
const noteService = new NoteGenerationService();

router.post('/generate', authMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }
    const { recordingId, patientContext } = req.body;
    if (!recordingId) {
      res.status(400).json({ success: false, error: 'recordingId required' });
      return;
    }
    const result = await noteService.generateSOAPNote(recordingId, req.user.userId, patientContext);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get('/list', authMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }
    const notes = await noteService.listNotes(req.user.userId, req.query.status as string);
    res.json({ success: true, data: notes });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }
    const note = await noteService.getNote(String(req.params.id), req.user.userId);
    res.json({ success: true, data: note });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }
    const { noteContent } = req.body;
    const updated = await noteService.updateNote(String(req.params.id), req.user.userId, noteContent);
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.post('/:id/approve', authMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }
    await noteService.approveNote(String(req.params.id), req.user.userId);
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
