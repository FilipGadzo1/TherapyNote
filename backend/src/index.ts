import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import recordingRoutes from './routes/recordings';
import notesRoutes from './routes/notes';
import './config/env';

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  })
);
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/recordings', recordingRoutes);
app.use('/api/notes', notesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
