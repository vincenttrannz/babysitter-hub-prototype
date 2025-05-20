
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockJobPostings } from "@/lib/mock-data";
import type { JobPosting } from "@/types";
import { format } from 'date-fns';
import { ClipboardList, CalendarDays, Clock, Users as UsersIcon, MessageSquare, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function JobBoardPage() {
  const { toast } = useToast();
  const openJobs = mockJobPostings.filter(job => job.status === 'open');

  const handleExpressInterest = (jobId: string, parentName: string) => {
    // Mock action
    console.log(`Expressed interest in job ${jobId} for ${parentName}`);
    toast({
      title: "Interest Expressed (Mock)",
      description: `Your interest in the job posted by ${parentName} has been noted. They will be notified.`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary flex items-center">
          <ClipboardList className="h-8 w-8 mr-2" />
          Job Board
        </h1>
        <p className="text-muted-foreground">
          Find open babysitting requests from other members in your community.
        </p>
      </div>

      {openJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg bg-card">
          <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-card-foreground">No Open Jobs</h2>
          <p className="text-muted-foreground">There are currently no open babysitting requests. Check back later!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {openJobs.map((job) => (
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
              <CardFooter>
                <Button 
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => handleExpressInterest(job.id, job.requestingParentName)}
                >
                  <CheckCircle className="mr-2 h-4 w-4" /> Express Interest
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
