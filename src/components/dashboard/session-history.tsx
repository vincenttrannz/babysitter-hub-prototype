import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Session, User } from '@/types';
import { mockSessions, mockUser } from '@/lib/mock-data'; // Using mockUser to determine perspective
import { format } from 'date-fns';

interface SessionHistoryProps {
  sessions?: Session[];
  currentUser?: User; // To determine if points are earned or spent
}

export function SessionHistory({ sessions = mockSessions, currentUser = mockUser }: SessionHistoryProps) {
  const getSessionPerspective = (session: Session) => {
    if (session.babysitterId === currentUser.id) {
      return { type: 'Earned', points: session.points, otherParty: session.parentName, role: "as Babysitter for" };
    }
    if (session.parentId === currentUser.id) {
      return { type: 'Spent', points: -session.points, otherParty: session.babysitterName, role: "Childcare by" };
    }
    return { type: 'N/A', points: 0, otherParty: 'Unknown', role: "" };
  };

  const getStatusVariant = (status: Session['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'confirmed': return 'default'; // default is usually primary
      case 'pending_babysitter':
      case 'pending_parent': return 'secondary';
      case 'disputed': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold tracking-tight text-primary mb-4">Session History</h2>
      {sessions.length === 0 ? (
        <p className="text-muted-foreground">No sessions recorded yet.</p>
      ) : (
        <div className="rounded-md border shadow-sm bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => {
                const perspective = getSessionPerspective(session);
                return (
                  <TableRow key={session.id}>
                    <TableCell>{format(new Date(session.date), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <div className="font-medium text-card-foreground">{perspective.role} {perspective.otherParty}</div>
                      <div className="text-sm text-muted-foreground">{session.startTime} - {session.endTime}</div>
                    </TableCell>
                    <TableCell className={`text-right font-semibold ${perspective.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {perspective.points > 0 ? `+${perspective.points}` : perspective.points}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={getStatusVariant(session.status)} className="capitalize">
                        {session.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
