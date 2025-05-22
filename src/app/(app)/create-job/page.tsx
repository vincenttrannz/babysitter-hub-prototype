
import { CreateJobForm } from '@/components/job/create-job-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

export default function CreateJobPage() {
  return (
    <div className="max-w-3xl mx-auto">
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
          <CreateJobForm />
        </CardContent>
      </Card>
    </div>
  );
}
