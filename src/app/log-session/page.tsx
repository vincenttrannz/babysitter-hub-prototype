import { LogSessionForm } from '@/components/session/log-session-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LogSessionPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Log a Babysitting Session</CardTitle>
          <CardDescription>
            Fill in the details below to record a session. Points will be calculated automatically.
            Remember, new members start with 10 points. Each half hour of babysitting is typically 1 point (2 points for late hours).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LogSessionForm />
        </CardContent>
      </Card>
    </div>
  );
}
