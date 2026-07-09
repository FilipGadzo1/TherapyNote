'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function NoteEditor({
  noteId,
  initialContent,
  initialStatus,
}: {
  noteId: string;
  initialContent: string;
  initialStatus?: string;
}) {
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState(initialStatus || 'draft');
  const [isSaving, setIsSaving] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const authHeader = () => ({
    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
  });

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    setError('');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/${noteId}`, {
        method: 'PUT',
        body: JSON.stringify({ noteContent: content }),
        headers: { 'Content-Type': 'application/json', ...authHeader() },
      });
      const data = await response.json();
      if (data.success) {
        setMessage('Note saved.');
      } else {
        setError(data.error || 'Save failed');
      }
    } catch {
      setError('Save failed. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleApprove = async () => {
    setIsApproving(true);
    setMessage('');
    setError('');
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notes/${noteId}/approve`,
        {
          method: 'POST',
          headers: authHeader(),
        }
      );
      const data = await response.json();
      if (data.success) {
        setStatus('approved');
        setMessage('Note approved and ready for export.');
      } else {
        setError(data.error || 'Approve failed');
      }
    } catch {
      setError('Approve failed. Please try again.');
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Status: {status}</p>
      <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={16} />
      <div className="flex gap-2">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
        <Button onClick={handleApprove} disabled={isApproving || status === 'approved'} variant="secondary">
          {isApproving ? 'Approving...' : 'Approve'}
        </Button>
      </div>
      {message && <p className="text-sm text-green-600">{message}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
