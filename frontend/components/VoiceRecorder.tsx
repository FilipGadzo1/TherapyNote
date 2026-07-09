'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const MAX_DURATION_SECONDS = 120;

type RecorderStatus = 'idle' | 'recording' | 'uploading' | 'done' | 'error';

export function VoiceRecorder({
  onRecordingComplete,
}: {
  onRecordingComplete: (recordingId: string) => void;
}) {
  const [status, setStatus] = useState<RecorderStatus>('idle');
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const durationRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRecording = async () => {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mediaRecorder.mimeType || 'audio/webm',
        });
        uploadRecording(audioBlob);
      };

      mediaRecorder.start();
      setStatus('recording');
      durationRef.current = 0;
      setDuration(0);

      intervalRef.current = setInterval(() => {
        durationRef.current += 1;
        setDuration(durationRef.current);
        if (durationRef.current >= MAX_DURATION_SECONDS) {
          stopRecording();
        }
      }, 1000);
    } catch {
      setError('Microphone access denied. Please allow microphone access and try again.');
      setStatus('error');
    }
  };

  const stopRecording = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const uploadRecording = async (audioBlob: Blob) => {
    setStatus('uploading');
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    formData.append('durationSeconds', durationRef.current.toString());

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recordings/upload`, {
        method: 'POST',
        body: formData,
        headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
      });
      const data = await response.json();
      if (data.success) {
        setStatus('done');
        onRecordingComplete(data.data.id);
      } else {
        setError(data.error || 'Upload failed');
        setStatus('error');
      }
    } catch {
      setError('Upload failed. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Duration: {duration}s (max {MAX_DURATION_SECONDS}s)
      </p>
      {status === 'recording' ? (
        <Button onClick={stopRecording} variant="destructive">
          Stop Recording
        </Button>
      ) : (
        <Button onClick={startRecording} disabled={status === 'uploading'}>
          {status === 'uploading' ? 'Uploading...' : 'Start Recording'}
        </Button>
      )}
      {status === 'done' && <p className="text-sm text-green-600">Recording uploaded.</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
