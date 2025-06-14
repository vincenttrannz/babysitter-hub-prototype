
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PointsSummary } from '@/components/dashboard/points-summary';
import { SessionHistory } from '@/components/dashboard/session-history';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarPlus, ListChecks, Users, ClipboardList, PlusCircle, Home, Info, AlertCircle } from 'lucide-react';
import { mockUser, mockSessions, mockJobPostings } from '@/lib/mock-data';

const ARREARS_LIMIT = -10; // Consistent with admin panel initial setting

export default function DashboardPage() {
  const currentUser = mockUser; 
  const sessions = mockSessions;
  const pendingConfirmationCount = sessions.filter(s => 
    (s.status === 'pending_parent' && s.parentId === currentUser.id) ||
    (s.status === 'pending_babysitter' && s.babysitterId === currentUser.id)
  ).length;
  const openJobCount = mockJobPostings.filter(job => job.status === 'open').length;

  const canCreateJob = currentUser.points > ARREARS_LIMIT;

  return (
    <div className="container py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Welcome back, {currentUser.name}!</h1>
        <p className="text-muted-foreground">Here's an overview of your Babysitter Hub activity.</p>
      </div>

      {currentUser.hubName && currentUser.hubCode && (
        <Card className="shadow-md bg-primary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Home className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl text-primary">Your Hub: {currentUser.hubName}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Share this code with others to invite them to your hub:
            </p>
            <div className="mt-2 flex items-center gap-2 p-3 bg-background rounded-md border border-input">
              <Info className="h-5 w-5 text-accent" />
              <strong className="text-lg font-mono text-primary tracking-wider">{currentUser.hubCode}</strong>
            </div>
          </CardContent>
        </Card>
      )}

      <PointsSummary points={currentUser.points} arrearsLimit={ARREARS_LIMIT} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
        {/* Row 1 */}
        <Card className="shadow-sm hover:shadow-md transition-shadow lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-primary">
              <CalendarPlus className="h-6 w-6" />
              Log a New Session
            </CardTitle>
            <CardDescription>Record your babysitting or childcare received.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/log-session">Log Session</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-primary">
              <PlusCircle className="h-6 w-6" />
              Create Job Posting
            </CardTitle>
            <CardDescription>Need a babysitter? Post your request here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={!canCreateJob}>
              <Link href="/create-job">Create Posting</Link>
            </Button>
            {!canCreateJob && (
              <p className="mt-2 text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                Your points are too low to create new job postings.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Row 2 */}
        <Card className="shadow-sm hover:shadow-md transition-shadow lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-primary">
              <ListChecks className="h-6 w-6" />
              Confirm Sessions
            </CardTitle>
            <CardDescription>You have {pendingConfirmationCount} session(s) awaiting your confirmation.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href="/confirm-sessions">View Pending</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-primary">
              <ClipboardList className="h-6 w-6" />
              Job Board
            </CardTitle>
            <CardDescription>There are {openJobCount} open job(s) available.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href="/job-board">View Job Board</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-primary">
              <Users className="h-6 w-6" />
              View Members
            </CardTitle>
            <CardDescription>See who is in your Babysitter Hub group.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href="/members">Community Members</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <SessionHistory sessions={sessions} currentUser={currentUser} />
    </div>
  );
}
