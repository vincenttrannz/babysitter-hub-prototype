
'use client';

import type { JobPosting, ExpressedInterest } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription as ShadCardDescription } from '@/components/ui/card'; // Renamed CardDescription to avoid conflict
import { CheckCircle, MessageSquare, Clock, UserCheck, AlertTriangle, BadgeCent } from 'lucide-react';
import { format, formatDistanceToNow, addHours, isPast } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ViewInterestsDialogProps {
  job: JobPosting;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectCandidate: (jobId: string, selectedInterest: ExpressedInterest) => void;
}

export function ViewInterestsDialog({
  job,
  open,
  onOpenChange,
  onSelectCandidate,
}: ViewInterestsDialogProps) {
  const { toast } = useToast();
  const [candidateToConfirm, setCandidateToConfirm] = useState<ExpressedInterest | null>(null);

  const handleInitiateSelectCandidate = (interest: ExpressedInterest) => {
    setCandidateToConfirm(interest);
    // The AlertDialog will be triggered by its own trigger, no need to manage its open state here directly
  };

  const handleConfirmSelection = () => {
    if (candidateToConfirm) {
      onSelectCandidate(job.id, candidateToConfirm);
      // Toasts for mock notifications are handled in the parent page (job-board/page.tsx)
      setCandidateToConfirm(null); // Reset
      onOpenChange(false); // Close main dialog
    }
  };

  const handleCancelSelection = () => {
    setCandidateToConfirm(null); // Reset
  }

  const getInterestStatus = (timestamp: Date): { text: string; isExpired: boolean; className: string } => {
    const expiryDate = addHours(new Date(timestamp), 24);
    if (isPast(expiryDate)) {
      return { text: 'Expired', isExpired: true, className: 'text-red-500 font-semibold' };
    }
    return { 
        text: `Expires ${formatDistanceToNow(expiryDate, { addSuffix: true })}`, 
        isExpired: false, 
        className: 'text-green-600' 
    };
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) setCandidateToConfirm(null); // Reset on main dialog close
      onOpenChange(isOpen);
    }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-primary">Interests for Your Job Posting</DialogTitle>
          <ShadCardDescription> {/* Using aliased CardDescription */}
            Review messages from members interested in your job scheduled for {format(new Date(job.date), 'MMM dd, yyyy')} at {job.startTime}.
            Interests are valid for 24 hours from the time they are expressed.
          </ShadCardDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4 py-4">
            {job.expressedInterests && job.expressedInterests.length > 0 ? (
              job.expressedInterests.map((interest, index) => {
                const status = getInterestStatus(interest.timestamp);
                return (
                  <Card key={index} className={cn("shadow-sm", status.isExpired && "opacity-60 bg-muted/50")}>
                    <CardHeader className="flex flex-row items-start gap-3 pb-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={interest.userAvatar} alt={interest.userName} data-ai-hint="person portrait" />
                        <AvatarFallback>{interest.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <CardTitle className="text-base text-card-foreground">{interest.userName}</CardTitle>
                        <ShadCardDescription className="text-xs flex items-center gap-1"> {/* Using aliased CardDescription */}
                          <Clock className="h-3 w-3" />
                          Expressed: {format(new Date(interest.timestamp), "MMM dd, HH:mm")}
                        </ShadCardDescription>
                         <p className={cn("text-xs mt-1", status.className)}>
                            {status.text}
                         </p>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm text-muted-foreground p-3 bg-secondary/30 rounded-md border-l-2 border-accent flex items-start gap-2">
                          <MessageSquare className="h-4 w-4 mt-0.5 shrink-0 text-accent"/> 
                          <p>{interest.message}</p>
                      </div>
                       <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            onClick={() => handleInitiateSelectCandidate(interest)}
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            disabled={status.isExpired}
                          >
                            <UserCheck className="mr-2 h-4 w-4" /> Select {interest.userName}
                          </Button>
                        </AlertDialogTrigger>
                        {candidateToConfirm && candidateToConfirm.userId === interest.userId && ( // Ensure modal is for the correct candidate
                           <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirm Candidate Selection</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to select <strong>{candidateToConfirm.userName}</strong> for the job on {format(new Date(job.date), 'MMM dd, yyyy')}?
                                This action will notify them and other applicants.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={handleCancelSelection}>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleConfirmSelection} className="bg-green-600 hover:bg-green-700">
                                Confirm Selection
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        )}
                      </AlertDialog>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 border-2 border-dashed rounded-lg">
                <AlertTriangle className="h-10 w-10 text-muted-foreground mb-3" />
                <p className="text-muted-foreground font-semibold">No interests expressed yet.</p>
                <p className="text-xs text-muted-foreground mt-1">Check back later to see if anyone is interested.</p>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

