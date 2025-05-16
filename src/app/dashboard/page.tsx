import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PointsSummary } from '@/components/dashboard/points-summary';
import { SessionHistory } from '@/components/dashboard/session-history';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarPlus, ListChecks, Users } from 'lucide-react';
import { mockUser, mockSessions } from '@/lib/mock-data'; // Import mock data

export default function DashboardPage() {
  // Using mock data for demonstration
  const currentUser = mockUser; 
  const sessions = mockSessions;
  const pendingConfirmationCount = sessions.filter(s => 
    (s.status === 'pending_parent' && s.parentId === currentUser.id) ||
    (s.status === 'pending_babysitter' && s.babysitterId === currentUser.id)
  ).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Welcome back, {currentUser.name}!</h1>
        <p className="text-muted-foreground">Here's an overview of your Family Time Bank activity.</p>
      </div>

      <PointsSummary points={currentUser.points} arrearsLimit={-10} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
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
        <Card className="shadow-sm hover:shadow-md transition-shadow">
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
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-primary">
              <Users className="h-6 w-6" />
              View Members
            </CardTitle>
            <CardDescription>See who is in your Family Time Bank group.</CardDescription>
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
