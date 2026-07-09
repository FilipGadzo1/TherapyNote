import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import prisma from '../lib/prisma';

const router = Router();

// Product assumption: each generated note saves ~28 minutes of manual documentation
const MINUTES_SAVED_PER_NOTE = 28;

router.get('/dashboard', authMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const userId = req.user.userId;
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const totalNotes = await prisma.note.count({ where: { userId, deletedAt: null } });
    const notesThisWeek = await prisma.note.count({
      where: { userId, deletedAt: null, createdAt: { gte: sevenDaysAgo } },
    });
    const avgDurationSeconds =
      (
        await prisma.recording.aggregate({
          where: { userId },
          _avg: { durationSeconds: true },
        })
      )._avg.durationSeconds || 0;
    const totalTimeSavedMinutes = totalNotes * MINUTES_SAVED_PER_NOTE;

    const recentNotes = await prisma.note.findMany({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, status: true, createdAt: true, updatedAt: true },
    });

    res.json({
      success: true,
      data: {
        totalNotes,
        notesThisWeek,
        avgDurationSeconds,
        totalTimeSavedMinutes,
        recentNotes,
      },
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
