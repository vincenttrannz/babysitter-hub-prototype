
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockMembers, mockUser } from "@/lib/mock-data"; // Use mockUser to get Hub Code
import { UserCheck, UserX, Edit3, Save, MailPlus, Home } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { InviteUserDialog } from "@/components/admin/invite-user-dialog";


const pendingMembers = mockMembers.slice(0, 2).map(m => ({ ...m, status: 'pending' as const })); // Mock pending members
const initialArrearsLimit = -10;

export default function AdminPage() {
  const { toast } = useToast();
  const [arrearsLimit, setArrearsLimit] = useState(initialArrearsLimit);
  const [editingArrears, setEditingArrears] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const currentUser = mockUser; // Current logged-in admin

  const handleApproveMember = (memberId: string) => {
    console.log(`Approving member ${memberId}`);
    toast({ title: "Member Approved (Mock)", description: `Member ${memberId} access granted.` });
  };

  const handleRejectMember = (memberId: string) => {
    console.log(`Rejecting member ${memberId}`);
    toast({ variant: "destructive", title: "Member Rejected (Mock)", description: `Member ${memberId} access denied.` });
  };
  
  const handleSaveArrearsLimit = () => {
    console.log(`Saving arrears limit: ${arrearsLimit}`);
    toast({ title: "Arrears Limit Updated (Mock)", description: `New limit is ${arrearsLimit} points.` });
    setEditingArrears(false);
  };

  const handleInviteSent = (email: string) => {
    toast({
      title: "Invitation Sent (Mock)",
      description: `An invitation email with the hub code ${currentUser.hubCode} has been (mock) sent to ${email}.`,
      duration: 7000,
    });
    setIsInviteModalOpen(false);
  };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Admin Panel</h1>
        <p className="text-muted-foreground">Manage members, settings, and platform operations.</p>
      </div>
      
      {currentUser.hubName && currentUser.hubCode && (
         <Card className="shadow-md bg-primary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Home className="h-7 w-7 text-primary" />
                    <div>
                        <CardTitle className="text-xl text-primary">Hub Management: {currentUser.hubName}</CardTitle>
                        <CardDescription>Hub Code: <span className="font-semibold text-primary">{currentUser.hubCode}</span></CardDescription>
                    </div>
                </div>
                <Button onClick={() => setIsInviteModalOpen(true)} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <MailPlus className="mr-2 h-5 w-5"/>
                    Invite New Member
                </Button>
            </div>
          </CardHeader>
        </Card>
      )}


      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Approve New Members</CardTitle>
          <CardDescription>Review and approve or reject pending membership requests.</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingMembers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Referred By (Mock)</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingMembers.map(member => (
                  <TableRow key={member.id}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>referrer@example.com</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700" onClick={() => handleApproveMember(member.id)}>
                        <UserCheck className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" onClick={() => handleRejectMember(member.id)}>
                        <UserX className="h-5 w-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">No pending membership requests.</p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Platform Settings</CardTitle>
          <CardDescription>Configure core platform parameters.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="arrears-limit" className="text-base font-medium">Points Arrears Limit</Label>
              <p className="text-sm text-muted-foreground">Maximum negative points a member can have.</p>
            </div>
            {editingArrears ? (
              <div className="flex items-center gap-2">
                <Input
                  id="arrears-limit"
                  type="number"
                  value={arrearsLimit}
                  onChange={(e) => setArrearsLimit(parseInt(e.target.value, 10))}
                  className="w-24"
                />
                <Button size="icon" onClick={handleSaveArrearsLimit} className="bg-accent text-accent-foreground">
                  <Save className="h-4 w-4"/>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-primary">{arrearsLimit} points</span>
                <Button variant="ghost" size="icon" onClick={() => setEditingArrears(true)}>
                  <Edit3 className="h-4 w-4"/>
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
                <Label htmlFor="new-member-points" className="text-base font-medium">New Member Starting Points</Label>
                <p className="text-sm text-muted-foreground">Points allocated to new members upon approval.</p>
            </div>
            <span className="text-lg font-semibold text-primary">10 points (Fixed)</span>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
                <Label htmlFor="referral-system" className="text-base font-medium">Referral System</Label>
                <p className="text-sm text-muted-foreground">Enable or disable referral-only sign-ups (Currently Inactive with Hub System).</p>
            </div>
            <Switch id="referral-system" checked={false} disabled /> {/* Mocked as disabled - Hub system active */}
          </div>
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground">Changes to settings may take a few moments to apply system-wide.</p>
        </CardFooter>
      </Card>

      {isInviteModalOpen && (
        <InviteUserDialog
          open={isInviteModalOpen}
          onOpenChange={setIsInviteModalOpen}
          hubCode={currentUser.hubCode || "N/A"}
          onInviteSubmit={handleInviteSent}
        />
      )}
    </div>
  );
}
