
'use client';
import type { Session, User } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle2, Clock, User as UserIcon, Users, XCircle, Hourglass } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface SessionConfirmationCardProps {
  session: Session;
  currentUser: User;
}

export function SessionConfirmationCard({ session, currentUser }: SessionConfirmationCardProps) {
  const { toast } = useToast();

  const isCurrentUserParent = session.parentId === currentUser.id;
  const isCurrentUserBabysitter = session.babysitterId === currentUser.id;

  let userRoleInSession: 'parent' | 'babysitter' | null = null;
  if (isCurrentUserParent) userRoleInSession = 'parent';
  else if (isCurrentUserBabysitter) userRoleInSession = 'babysitter';

  const canParentConfirm = userRoleInSession === 'parent' && session.status === 'pending_parent';
  const isBabysitterAwaitingConfirmation = userRoleInSession === 'babysitter' && session.status === 'pending_babysitter';

  const handleConfirm = () => {
    console.log(`Confirming session ${session.id} by parent ${currentUser.name}`);
    toast({ 
      title: "Session Confirmed (Mock)", 
      description: `You (as parent) confirmed the session. ${session.points} points will be spent.` 
    });
    // Mock notification to babysitter
    toast({
      title: "Session Confirmed by Parent (Mock Notification)",
      description: `${currentUser.name} (parent) confirmed the session on ${format(new Date(session.date), 'MMM dd')}. ${session.points} points earned.`,
      duration: 7000,
    });
    // In a real app, update session status and user points here
  };

  const handleDispute = () => {
    console.log(`Disputing session ${session.id} by parent ${currentUser.name}`);
    toast({ 
      variant: "destructive", 
      title: "Session Disputed (Mock)", 
      description: `You (as parent) disputed session ${session.id}. An admin may review this.` 
    });
     // Mock notification to babysitter
    toast({
      variant: "destructive",
      title: "Session Disputed by Parent (Mock Notification)",
      description: `${currentUser.name} (parent) disputed the session on ${format(new Date(session.date), 'MMM dd')}.`,
      duration: 7000,
    });
    // In a real app, update session status to 'disputed'
  };

  let roleDescription = "";
  let otherPartyName = "";
  let pointsDisplay = "";
  let pointsColorClass = "";
  let alertMessage = null;

  if (userRoleInSession === 'parent') {
    roleDescription = "Childcare by";
    otherPartyName = session.babysitterName;
    pointsDisplay = `-${session.points}`;
    pointsColorClass = 'text-red-600';
    if (canParentConfirm) {
      alertMessage = (
        <div className="mt-2 p-3 bg-yellow-500/10 border border-yellow-500/50 rounded-md text-sm text-yellow-700 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5"/>
          Your confirmation is required for this session.
        </div>
      );
    }
  } else if (userRoleInSession === 'babysitter') {
    roleDescription = "You babysat for";
    otherPartyName = session.parentName;
    pointsDisplay = `+${session.points}`;
    pointsColorClass = 'text-green-600';
    if (isBabysitterAwaitingConfirmation) {
      alertMessage = (
        <div className="mt-2 p-3 bg-blue-500/10 border border-blue-500/50 rounded-md text-sm text-blue-700 flex items-center gap-2">
          <Hourglass className="h-5 w-5"/>
          Awaiting confirmation from {session.parentName}.
        </div>
      );
    }
  }
  
  if (session.status === 'confirmed') {
     alertMessage = (
        <div className="mt-2 p-3 bg-green-500/10 border border-green-500/50 rounded-md text-sm text-green-700 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5"/>
          This session has been confirmed.
        </div>
      );
  } else if (session.status === 'disputed') {
    alertMessage = (
        <div className="mt-2 p-3 bg-red-500/10 border border-red-500/50 rounded-md text-sm text-red-700 flex items-center gap-2">
          <XCircle className="h-5 w-5"/>
          This session is disputed. An admin will review.
        </div>
      );
  }


  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow w-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl text-primary flex items-center justify-between">
          <span>Session on {format(new Date(session.date), 'MMM dd, yyyy')}</span>
          {pointsDisplay && (
            <span className={cn("text-2xl font-bold", pointsColorClass)}>{pointsDisplay} pts</span>
          )}
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Clock className="h-4 w-4" /> {session.startTime} - {session.endTime}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 flex-grow">
        {roleDescription && otherPartyName && (
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-5 w-5 text-muted-foreground" /> 
            <span>{roleDescription} <strong>{otherPartyName}</strong></span>
          </div>
        )}
        {session.notes && (
          <p className="text-sm text-muted-foreground border-l-2 border-primary pl-3 py-1 bg-secondary/50 rounded-r-md">
            <strong>Notes:</strong> {session.notes}
          </p>
        )}
        {alertMessage}
      </CardContent>
      {canParentConfirm && (
        <CardFooter className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={handleDispute} className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive">
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

