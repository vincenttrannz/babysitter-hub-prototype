
import { SessionConfirmationCard } from '@/components/session/session-confirmation-card';
import { mockSessions, mockUser } from '@/lib/mock-data';
import type { Session } from '@/types';
import { AlertTriangle, CheckSquare, Hourglass } from 'lucide-react';

export default function ConfirmSessionsPage() {
  const currentUser = mockUser; // Use mock current user
  
  const sessionsAwaitingMyConfirmationAsParent: Session[] = mockSessions.filter(session => 
    session.status === 'pending_parent' && session.parentId === currentUser.id
  );

  const sessionsAwaitingParentConfirmationForMyBabysitting: Session[] = mockSessions.filter(session =>
    session.status === 'pending_babysitter' && session.babysitterId === currentUser.id
  );

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-primary">Pending Session Confirmations</h1>
        <p className="text-muted-foreground">Review sessions that require your action or are awaiting action from others.</p>
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-3">
            <CheckSquare className="h-7 w-7 text-primary" />
            <div>
                <h2 className="text-2xl font-semibold text-primary">Sessions Awaiting Your Confirmation (As Parent)</h2>
                <p className="text-muted-foreground">Confirm these sessions where you received childcare to finalize point transfers.</p>
            </div>
        </div>
        {sessionsAwaitingMyConfirmationAsParent.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg bg-card">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground">No Sessions to Confirm</h3>
            <p className="text-muted-foreground">You have no pending sessions where you need to confirm childcare received.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {sessionsAwaitingMyConfirmationAsParent.map(session => (
              <SessionConfirmationCard key={session.id} session={session} currentUser={currentUser} />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3">
            <Hourglass className="h-7 w-7 text-primary" />
            <div>
                <h2 className="text-2xl font-semibold text-primary">Your Babysitting Sessions (Awaiting Parent Confirmation)</h2>
                <p className="text-muted-foreground">These are sessions where you provided childcare and are waiting for the parent to confirm.</p>
            </div>
        </div>
        {sessionsAwaitingParentConfirmationForMyBabysitting.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg bg-card">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground">No Sessions Awaiting Others' Confirmation</h3>
            <p className="text-muted-foreground">You have no pending sessions where you provided childcare that are awaiting confirmation.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {sessionsAwaitingParentConfirmationForMyBabysitting.map(session => (
              <SessionConfirmationCard key={session.id} session={session} currentUser={currentUser} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

