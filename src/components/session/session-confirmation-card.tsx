'use client';
import type { Session, User } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle2, Clock, User as UserIcon, Users, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface SessionConfirmationCardProps {
  session: Session;
  currentUser: User; // To determine actions available
}

export function SessionConfirmationCard({ session, currentUser }: SessionConfirmationCardProps) {
  const { toast } = useToast();
  const isCurrentUserParent = session.parentId === currentUser.id;
  const isCurrentUserBabysitter = session.babysitterId === currentUser.id;

  let confirmationNeededFrom: 'parent' | 'babysitter' | null = null;
  if (session.status === 'pending_parent') confirmationNeededFrom = 'parent';
  if (session.status === 'pending_babysitter') confirmationNeededFrom = 'babysitter';

  const canConfirm = 
    (confirmationNeededFrom === 'parent' && isCurrentUserParent) ||
    (confirmationNeededFrom === 'babysitter' && isCurrentUserBabysitter);

  const handleConfirm = () => {
    // Mock action
    console.log(`Confirming session ${session.id}`);
    toast({ title: "Session Confirmed (Mock)", description: `Session ${session.id} has been marked as confirmed.` });
  };

  const handleDispute = () => {
    // Mock action
    console.log(`Disputing session ${session.id}`);
    toast({ variant: "destructive", title: "Session Disputed (Mock)", description: `Session ${session.id} has been marked as disputed.` });
  };

  const role = isCurrentUserBabysitter ? "You babysat for" : "Childcare by";
  const otherPartyName = isCurrentUserBabysitter ? session.parentName : session.babysitterName;
  const pointsPerspective = isCurrentUserBabysitter ? `+${session.points}` : `-${session.points}`;
  const pointsColor = isCurrentUserBabysitter ? 'text-green-600' : 'text-red-600';

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow w-full">
      <CardHeader>
        <CardTitle className="text-xl text-primary flex items-center justify-between">
          <span>Session on {format(new Date(session.date), 'MMM dd, yyyy')}</span>
          <span className={`text-2xl font-bold ${pointsColor}`}>{pointsPerspective} pts</span>
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Clock className="h-4 w-4" /> {session.startTime} - {session.endTime}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-5 w-5 text-muted-foreground" /> 
          <span>{role} <strong>{otherPartyName}</strong></span>
        </div>
        {session.notes && (
          <p className="text-sm text-muted-foreground border-l-2 border-primary pl-3 py-1 bg-secondary/50 rounded-r-md">
            <strong>Notes:</strong> {session.notes}
          </p>
        )}
        {canConfirm && (
           <div className="mt-2 p-3 bg-yellow-500/10 border border-yellow-500/50 rounded-md text-sm text-yellow-700 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5"/>
            Your confirmation is required for this session.
          </div>
        )}
      </CardContent>
      {canConfirm && (
        <CardFooter className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleDispute} className="border-destructive text-destructive hover:bg-destructive/10">
            <XCircle className="mr-2 h-4 w-4" /> Dispute
          </Button>
          <Button onClick={handleConfirm} className="bg-green-600 hover:bg-green-700 text-white">
            <CheckCircle2 className="mr-2 h-4 w-4" /> Confirm Session
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
