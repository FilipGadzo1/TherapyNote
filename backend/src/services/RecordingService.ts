import crypto from 'crypto';
import prisma from '../lib/prisma';
import { uploadToS3 } from '../lib/s3';

export class RecordingService {
  async uploadRecording(
    userId: string,
    audioBuffer: Buffer,
    durationSeconds: number,
    contentType?: string
  ) {
    const timestamp = Date.now();
    const randomId = crypto.randomBytes(8).toString('hex');
    const s3Key = `recordings/${userId}/${timestamp}-${randomId}.webm`;

    await uploadToS3(s3Key, audioBuffer, contentType);

    const recording = await prisma.recording.create({
      data: {
        userId,
        audioS3Path: s3Key,
        audioEncrypted: true, // encrypted at rest by S3 (SSE AES-256)
        durationSeconds,
      },
    });

    return recording;
  }

  async getRecording(recordingId: string, userId: string) {
    const recording = await prisma.recording.findFirst({
      where: { id: recordingId, userId },
    });
    if (!recording) throw new Error('Recording not found');
    return recording;
  }
}
