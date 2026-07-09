import { describe, test, expect, beforeAll, afterAll, vi } from 'vitest';

const { MOCK_SOAP } = vi.hoisted(() => ({
  MOCK_SOAP: 'SUBJECTIVE:\nMocked note.\n\nOBJECTIVE:\nMocked.',
}));

vi.mock('@anthropic-ai/sdk', () => {
  return {
    default: class MockAnthropic {
      messages = {
        create: vi.fn().mockResolvedValue({
          content: [{ type: 'text', text: MOCK_SOAP }],
          stop_reason: 'end_turn',
        }),
      };
    },
  };
});

vi.mock('../src/lib/s3', () => ({
  uploadToS3: vi.fn().mockResolvedValue('recordings/mock/key.webm'),
  getS3Url: vi.fn().mockResolvedValue('https://mock-s3/signed-url'),
}));

import { NoteGenerationService } from '../src/services/NoteGenerationService';
import { EncryptionService } from '../src/services/EncryptionService';
import prisma from '../src/lib/prisma';

const EMAIL = 'vitest-notes@test.local';

describe('NoteGenerationService', () => {
  let noteService: NoteGenerationService;
  let userId: string;
  let recordingId: string;

  beforeAll(async () => {
    noteService = new NoteGenerationService();
    await prisma.note.deleteMany({ where: { user: { email: EMAIL } } });
    await prisma.recording.deleteMany({ where: { user: { email: EMAIL } } });
    await prisma.user.deleteMany({ where: { email: EMAIL } });

    const user = await prisma.user.create({
      data: { email: EMAIL, passwordHash: 'irrelevant-for-this-test' },
    });
    userId = user.id;
    const recording = await prisma.recording.create({
      data: { userId, audioS3Path: 'recordings/mock/key.webm', durationSeconds: 45 },
    });
    recordingId = recording.id;
  });

  afterAll(async () => {
    await prisma.note.deleteMany({ where: { userId } });
    await prisma.recording.deleteMany({ where: { userId } });
    await prisma.user.deleteMany({ where: { id: userId } });
    await prisma.$disconnect();
  });

  test('generateSOAPNote stores draft note with encrypted patient id', async () => {
    const result = await noteService.generateSOAPNote(recordingId, userId, {
      patientName: 'Jane Q',
      condition: 'Anxiety',
      modality: 'CBT',
    });

    expect(result.soapNote).toBe(MOCK_SOAP);

    const note = await prisma.note.findUnique({ where: { id: result.note.id } });
    expect(note!.status).toBe('draft');
    expect(note!.noteContent).toBe(MOCK_SOAP);
    expect(note!.patientId).not.toContain('Jane Q');
    expect(EncryptionService.decryptPatientId(note!.patientId)).toBe('Jane Q');
  });

  test('generateSOAPNote rejects a recording owned by another user', async () => {
    await expect(
      noteService.generateSOAPNote(recordingId, 'someone-else', undefined)
    ).rejects.toThrow('Recording not found');
  });

  test('updateNote bumps version and replaces content', async () => {
    const note = await prisma.note.findFirst({ where: { userId } });
    const updated = await noteService.updateNote(note!.id, userId, 'SUBJECTIVE:\nEdited.');
    expect(updated.noteContent).toBe('SUBJECTIVE:\nEdited.');
    expect(updated.noteVersion).toBe(note!.noteVersion + 1);
  });

  test('updateNote rejects notes owned by another user', async () => {
    const note = await prisma.note.findFirst({ where: { userId } });
    await expect(noteService.updateNote(note!.id, 'someone-else', 'hijack')).rejects.toThrow(
      'Note not found'
    );
  });

  test('approveNote transitions status to approved', async () => {
    const note = await prisma.note.findFirst({ where: { userId } });
    await noteService.approveNote(note!.id, userId);
    const after = await noteService.getNote(note!.id, userId);
    expect(after.status).toBe('approved');
  });

  test('listNotes returns only this user notes', async () => {
    const notes = await noteService.listNotes(userId);
    expect(notes.length).toBeGreaterThan(0);
    expect(notes.every((n) => n.userId === userId)).toBe(true);
  });

  test('getNote rejects cross-user access', async () => {
    const note = await prisma.note.findFirst({ where: { userId } });
    await expect(noteService.getNote(note!.id, 'someone-else')).rejects.toThrow('Note not found');
  });
});
