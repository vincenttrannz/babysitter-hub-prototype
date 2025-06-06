
'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockJobPostings, mockUser } from "@/lib/mock-data";
import type { JobPosting, ExpressedInterest } from "@/types";
import { format } from 'date-fns';
import { ClipboardList, CalendarDays, Clock, Users as UsersIcon, MessageSquare, CheckCircle, PlusCircle, Send, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';
import { ExpressInterestDialog } from '@/components/job/express-interest-dialog';

export default function JobBoardPage() {
  const { toast } = useToast();
  const [jobPostings, setJobPostings] = useState<JobPosting[]>(
    mockJobPostings.filter(job => job.status === 'open')
  );
  const [selectedJobForInterest, setSelectedJobForInterest] = useState<JobPosting | null>(null);

  const currentUser = mockUser;

  const handleOpenInterestDialog = (job: JobPosting) => {
    setSelectedJobForInterest(job);
  };

  const handleExpressInterestSubmit = (jobId: string, message: string) => {
    const jobToUpdate = jobPostings.find(job => job.id === jobId);
    if (!jobToUpdate) return;

    const newInterest: ExpressedInterest = {
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatarUrl,
      message: message,
      timestamp: new Date(),
    };

    setJobPostings(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId
          ? { ...job, expressedInterests: [...(job.expressedInterests || []), newInterest] }
          : job
      )
    );

    toast({
      title: "Interest Sent!",
      description: `Your message has been sent to ${jobToUpdate.requestingParentName}.`,
    });
    
    // Mock notification for job owner
    if (jobToUpdate.requestingParentId !== currentUser.id) {
        toast({
            title: "New Job Interest (Mock Notification)",
            description: `${currentUser.name} expressed interest in your job posting for ${format(new Date(jobToUpdate.date), 'MMM dd')}.`,
            duration: 5000, 
        });
    }
    setSelectedJobForInterest(null); // Close dialog
  };

  const hasCurrentUserExpressedInterest = (job: JobPosting): boolean => {
    return !!job.expressedInterests?.some(interest => interest.userId === currentUser.id);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary flex items-center">
            <ClipboardList className="h-8 w-8 mr-2" />
            Job Board
          </h1>
          <p className="text-muted-foreground">
            Find open babysitting requests from other members in your community.
          </p>
        </div>
        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/create-job">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Job Posting
          </Link>
        </Button>
      </div>

      {jobPostings.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg bg-card">
          <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-card-foreground">No Open Jobs</h2>
          <p className="text-muted-foreground">There are currently no open babysitting requests. Check back later or create one!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {jobPostings.map((job) => {
            const alreadyExpressed = hasCurrentUserExpressedInterest(job);
            const isOwner = job.requestingParentId === currentUser.id;

            return (
            <Card key={job.id} className="shadow-lg flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage src={job.requestingParentAvatar} alt={job.requestingParentName} data-ai-hint="person portrait" />
                    <AvatarFallback>{job.requestingParentName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl text-primary">{job.requestingParentName}</CardTitle>
                    <CardDescription>Needs a babysitter</CardDescription>
                  </div>
                </div>
                 <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-accent" />
                        <span>{format(new Date(job.date), 'EEEE, MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-accent" />
                        <span>{job.startTime} - {job.endTime}</span>
                    </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{job.numberOfChildren} child{job.numberOfChildren > 1 ? 'ren' : ''}</span>
                  {job.childrenAgeRange && <span className="text-muted-foreground">({job.childrenAgeRange})</span>}
                </div>
                {job.notes && (
                  <div className="text-sm text-muted-foreground p-3 bg-secondary/50 rounded-md border-l-2 border-primary flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 mt-0.5 shrink-0 text-primary"/> 
                    <p>{job.notes}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col items-stretch gap-2">
                {isOwner ? (
                   <Button variant="outline" disabled className="w-full">
                     <Info className="mr-2 h-4 w-4" /> This is your job posting
                   </Button>
                ) : alreadyExpressed ? (
                  <Button 
                    variant="outline" 
                    disabled 
                    className="w-full border-green-600 text-green-600 bg-green-500/10 cursor-not-allowed"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" /> Interest Expressed
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => handleOpenInterestDialog(job)}
                  >
                    <Send className="mr-2 h-4 w-4" /> Express Interest
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
        </div>
      )}

      {selectedJobForInterest && (
        <ExpressInterestDialog
          open={!!selectedJobForInterest}
          onOpenChange={(isOpen) => {
            if (!isOpen) setSelectedJobForInterest(null);
          }}
          jobId={selectedJobForInterest.id}
          jobOwnerName={selectedJobForInterest.requestingParentName}
          onExpressInterestSubmit={handleExpressInterestSubmit}
        />
      )}
    </div>
  );
}

