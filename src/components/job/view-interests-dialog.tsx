
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, MessageSquare, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface ViewInterestsDialogProps {
  job: JobPosting;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMarkAsFilled: (jobId: string) => void;
}

export function ViewInterestsDialog({
  job,
  open,
  onOpenChange,
  onMarkAsFilled,
}: ViewInterestsDialogProps) {
  
  const handleMarkFilledClick = () => {
    onMarkAsFilled(job.id);
    onOpenChange(false); // Close dialog
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-primary">Interests for Your Job Posting</DialogTitle>
          <DialogDescription>
            Review messages from members interested in your job scheduled for {format(new Date(job.date), 'MMM dd, yyyy')} at {job.startTime}.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[50vh] pr-4">
          <div className="space-y-4 py-4">
            {job.expressedInterests && job.expressedInterests.length > 0 ? (
              job.expressedInterests.map((interest, index) => (
                <Card key={index} className="shadow-sm">
                  <CardHeader className="flex flex-row items-center gap-3 pb-2">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={interest.userAvatar} alt={interest.userName} data-ai-hint="person portrait" />
                      <AvatarFallback>{interest.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base text-card-foreground">{interest.userName}</CardTitle>
                      <CardDescription className="text-xs flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {format(new Date(interest.timestamp), "MMM dd, HH:mm")}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground p-3 bg-secondary/30 rounded-md border-l-2 border-accent flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 mt-0.5 shrink-0 text-accent"/> 
                        <p>{interest.message}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">No interests expressed for this job yet.</p>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="sm:justify-between items-center gap-2 mt-2">
          <Button 
            onClick={handleMarkFilledClick} 
            className="bg-green-600 hover:bg-green-700 text-white order-2 sm:order-1 w-full sm:w-auto"
            disabled={job.expressedInterests?.length === 0}
          >
            <CheckCircle className="mr-2 h-4 w-4" /> Mark as Filled
          </Button>
          <DialogClose asChild className="order-1 sm:order-2 w-full sm:w-auto">
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

