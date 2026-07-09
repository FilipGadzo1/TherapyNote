'use client';

import { use, useEffect, useState } from 'react';
import { NoteEditor } from '@/components/NoteEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Note {
  id: string;
  noteContent: string;
  status: string;
  createdAt: string;
}

export default function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [note, setNote] = useState<Note | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/${id}`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
        });
        const data = await res.json();
        if (data.success) {
          setNote(data.data);
        } else {
          setError(data.error || 'Could not load note');
        }
      } catch {
        setError('Could not load note. Please try again.');
      }
    };
    fetchNote();
  }, [id]);

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Clinical Note</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {!note && !error && <p className="text-sm text-muted-foreground">Loading...</p>}
          {note && (
            <NoteEditor noteId={note.id} initialContent={note.noteContent} initialStatus={note.status} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
