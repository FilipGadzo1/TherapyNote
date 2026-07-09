'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RecordPage() {
  const router = useRouter();
  const [recordingId, setRecordingId] = useState<string | null>(null);
  const [patientName, setPatientName] = useState('');
  const [condition, setCondition] = useState('');
  const [modality, setModality] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!recordingId) return;
    setIsGenerating(true);
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          recordingId,
          patientContext: {
            patientName: patientName || undefined,
            condition: condition || undefined,
            modality: modality || undefined,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        router.push(`/notes/${data.data.note.id}`);
      } else {
        setError(data.error || 'Note generation failed');
      }
    } catch {
      setError('Note generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>New Recording</CardTitle>
          <CardDescription>
            Record a 30-120 second voice memo about your session. It will be encrypted and used to
            generate your SOAP note.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VoiceRecorder onRecordingComplete={setRecordingId} />
        </CardContent>
      </Card>

      {recordingId && (
        <Card>
          <CardHeader>
            <CardTitle>Patient Context (optional)</CardTitle>
            <CardDescription>Helps generate a more accurate note.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient name / identifier</Label>
              <Input id="patientName" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="condition">Presenting issue</Label>
              <Input id="condition" value={condition} onChange={(e) => setCondition(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="modality">Treatment modality</Label>
              <Input id="modality" value={modality} onChange={(e) => setModality(e.target.value)} placeholder="e.g. CBT, DBT" />
            </div>
            <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
              {isGenerating ? 'Generating note...' : 'Generate SOAP Note'}
            </Button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
