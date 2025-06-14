
'use client';
import { CreateJobForm } from '@/components/job/create-job-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, PlusCircle } from 'lucide-react';
import { mockUser } from '@/lib/mock-data'; // Assuming we use mockUser for the current user context

const ARREARS_LIMIT = -10; // Consistent with admin panel initial setting

export default function CreateJobPage() {
  const currentUser = mockUser;
  const canPostJob = currentUser.points > ARREARS_LIMIT;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {!canPostJob && (
        <Alert variant="destructive" className="shadow-md">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Unable to Create Job Posting</AlertTitle>
          <AlertDescription>
            Your current points balance ({currentUser.points}) is at or below the arrears limit of {ARREARS_LIMIT} points. 
            Please log completed babysitting sessions to earn more points before creating new job postings.
          </AlertDescription>
        </Alert>
      )}
      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <PlusCircle className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-bold text-primary">Create a New Job Posting</CardTitle>
          </div>
          <CardDescription>
            Fill in the details below to post a babysitting request to the community job board.
            Other members will be able to see this posting and express their interest.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateJobForm canPostJob={canPostJob} />
        </CardContent>
      </Card>
    </div>
  );
}
