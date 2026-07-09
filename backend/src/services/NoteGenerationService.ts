import Anthropic from '@anthropic-ai/sdk';
import prisma from '../lib/prisma';
import { RecordingService } from './RecordingService';
import { EncryptionService } from './EncryptionService';
import { getS3Url } from '../lib/s3';

const client = new Anthropic();

export interface PatientContext {
  patientName?: string;
  condition?: string;
  modality?: string;
}

export class NoteGenerationService {
  async generateSOAPNote(
    recordingId: string,
    userId: string,
    patientContext?: PatientContext
  ): Promise<{ note: { id: string }; soapNote: string }> {
    const recordingService = new RecordingService();
    const recording = await recordingService.getRecording(recordingId, userId);

    // Placeholder until audio transcription is wired up (post-MVP):
    // the signed URL proves the recording exists; Claude works from context fields
    const audioUrl = await getS3Url(recording.audioS3Path);

    const prompt = `You are an experienced clinical note generator specializing in mental health documentation.
Convert the following therapy session notes into a professional SOAP-formatted clinical note.

Patient Context:
- Name: ${patientContext?.patientName || 'Patient'}
- Presenting Issue: ${patientContext?.condition || 'Unknown'}
- Treatment Modality: ${patientContext?.modality || 'Psychotherapy'}

Session Recording: [Audio from ${audioUrl}]

Guidelines:
- Use clinical terminology appropriate for mental health professionals
- Focus on clinically relevant details only
- Include observations about patient affect, behavior, and engagement
- Reference specific therapeutic techniques or modalities if mentioned
- Maintain objectivity and professional tone
- Do NOT include personal opinions or assumptions
- Format strictly as SOAP (Subjective, Objective, Assessment, Plan)

Generate a professional SOAP note:

SUBJECTIVE:
[Patient's reported experience, symptoms, and session topics]

OBJECTIVE:
[Therapist observations: affect, behavior, engagement, clinical signs]

ASSESSMENT:
[Progress toward goals, clinical impression, overall functioning]

PLAN:
[Treatment recommendations, homework/assignments, plan adjustments]`;

    const message = await client.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 1024,
      // Short formatting task: skip thinking for latency and cost
      thinking: { type: 'disabled' },
      messages: [{ role: 'user', content: prompt }],
    });

    const soapNote = message.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n');

    const note = await prisma.note.create({
      data: {
        userId,
        recordingId,
        patientId: EncryptionService.encryptPatientId(patientContext?.patientName || 'Unknown'),
        noteContent: soapNote,
        status: 'draft',
      },
    });

    return { note: { id: note.id }, soapNote };
  }

  async updateNote(noteId: string, userId: string, noteContent: string) {
    const note = await prisma.note.findFirst({ where: { id: noteId, userId } });
    if (!note) throw new Error('Note not found');

    const updated = await prisma.note.update({
      where: { id: noteId },
      data: {
        noteContent,
        noteVersion: note.noteVersion + 1,
      },
    });

    return updated;
  }

  async approveNote(noteId: string, userId: string) {
    const note = await prisma.note.findFirst({ where: { id: noteId, userId } });
    if (!note) throw new Error('Note not found');

    await prisma.note.update({
      where: { id: noteId },
      data: { status: 'approved' },
    });
  }

  async getNote(noteId: string, userId: string) {
    const note = await prisma.note.findFirst({ where: { id: noteId, userId } });
    if (!note) throw new Error('Note not found');
    return note;
  }

  async listNotes(userId: string, status?: string) {
    const notes = await prisma.note.findMany({
      where: { userId, status: status || undefined, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return notes;
  }
}
