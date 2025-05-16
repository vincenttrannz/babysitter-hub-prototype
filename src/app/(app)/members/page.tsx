
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockMembers } from "@/lib/mock-data";
import { Users, Search, Mail, Coins } from "lucide-react";

export default function MembersPage() {
  // In a real app, you'd fetch members and implement search/filter
  const members = mockMembers;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <Users className="h-8 w-8" /> Community Members
        </h1>
        <p className="text-muted-foreground">
          Meet the families in your Time Bank group.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search members by name..."
          className="pl-10 w-full md:w-1/2 lg:w-1/3"
          // Add onChange handler for actual search functionality
        />
      </div>

      {members.length === 0 ? (
        <p className="text-muted-foreground">No members found in this group yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {members.map((member) => (
            <Card key={member.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="items-center text-center">
                <Avatar className="w-20 h-20 mb-2 border-2 border-primary">
                  <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint="person portrait" />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl text-primary">{member.name}</CardTitle>
                {member.isAdmin && <CardDescription className="text-xs text-accent font-semibold">Admin</CardDescription>}
              </CardHeader>
              <CardContent className="text-sm text-center space-y-2">
                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{member.email}</span>
                </div>
                 <div className="flex items-center justify-center gap-1 text-muted-foreground">
                  <Coins className="h-4 w-4 text-yellow-500" />
                  <span>Current Points: <strong className={member.points >= 0 ? 'text-green-600' : 'text-red-600'}>{member.points}</strong></span>
                </div>
                {/* Add more details like 'Joined Date' if available */}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
