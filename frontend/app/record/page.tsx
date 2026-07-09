'use client';

import { useState } from 'react';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RecordPage() {
  const [recordingId, setRecordingId] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-2xl p-6">
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
          {recordingId && (
            <p className="mt-4 text-sm text-muted-foreground">
              Recording saved (ID: {recordingId}). Note generation coming in the next step.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
