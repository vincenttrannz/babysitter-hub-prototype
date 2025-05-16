
import { SessionConfirmationCard } from '@/components/session/session-confirmation-card';
import { mockSessions, mockUser } from '@/lib/mock-data';
import type { Session } from '@/types';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmSessionsPage() {
  const currentUser = mockUser; // Use mock current user
  
  const pendingSessions: Session[] = mockSessions.filter(session => 
    (session.status === 'pending_parent' && session.parentId === currentUser.id) ||
    (session.status === 'pending_babysitter' && session.babysitterId === currentUser.id)
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Pending Session Confirmations</h1>
        <p className="text-muted-foreground">Review the sessions below that require your confirmation.</p>
      </div>

      {pendingSessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg bg-card">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-card-foreground">No Pending Confirmations</h2>
          <p className="text-muted-foreground">You're all caught up! There are no sessions awaiting your confirmation at this time.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {pendingSessions.map(session => (
            <SessionConfirmationCard key={session.id} session={session} currentUser={currentUser} />
          ))}
        </div>
      )}
    </div>
  );
}
