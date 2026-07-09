'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface RecentNote {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface DashboardData {
  totalNotes: number;
  notesThisWeek: number;
  avgDurationSeconds: number;
  totalTimeSavedMinutes: number;
  recentNotes: RecentNote[];
}

export function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analytics/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        } else {
          setError(json.error || 'Could not load dashboard');
        }
      } catch {
        setError('Could not load dashboard. Please try again.');
      }
    };
    fetchData();
  }, [router]);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!data) return <p className="text-sm text-muted-foreground">Loading...</p>;

  const hoursSaved = Math.floor(data.totalTimeSavedMinutes / 60);
  const minutesSaved = data.totalTimeSavedMinutes % 60;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Total notes</CardDescription>
            <CardTitle className="text-3xl">{data.totalNotes}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Notes this week</CardDescription>
            <CardTitle className="text-3xl">{data.notesThisWeek}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Time saved</CardDescription>
            <CardTitle className="text-3xl">
              {hoursSaved > 0 ? `${hoursSaved}h ${minutesSaved}m` : `${minutesSaved}m`}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent notes</CardTitle>
          <CardDescription>Your five most recent clinical notes</CardDescription>
        </CardHeader>
        <CardContent>
          {data.recentNotes.length === 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                No notes yet. Record your first session memo to get started.
              </p>
              <Link href="/record" className={buttonVariants()}>
                New Recording
              </Link>
            </div>
          ) : (
            <ul className="divide-y">
              {data.recentNotes.map((note) => (
                <li key={note.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">
                      {new Date(note.createdAt).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Status: {note.status}</p>
                  </div>
                  <Link
                    href={`/notes/${note.id}`}
                    className={buttonVariants({ variant: 'outline', size: 'sm' })}
                  >
                    Open
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
