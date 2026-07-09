import { describe, test, expect } from 'vitest';
import { EncryptionService } from '../src/services/EncryptionService';

describe('EncryptionService', () => {
  test('encrypt/decrypt round-trips patient ID', () => {
    const encrypted = EncryptionService.encryptPatientId('patient-42');
    expect(encrypted).not.toContain('patient-42');
    expect(EncryptionService.decryptPatientId(encrypted)).toBe('patient-42');
  });

  test('same plaintext encrypts to different ciphertexts (random IV)', () => {
    const a = EncryptionService.encryptPatientId('patient-42');
    const b = EncryptionService.encryptPatientId('patient-42');
    expect(a).not.toBe(b);
    expect(EncryptionService.decryptPatientId(a)).toBe(EncryptionService.decryptPatientId(b));
  });

  test('handles unicode and long values', () => {
    const value = 'Пациент-Ω-' + 'x'.repeat(500);
    expect(EncryptionService.decryptPatientId(EncryptionService.encryptPatientId(value))).toBe(
      value
    );
  });
});
