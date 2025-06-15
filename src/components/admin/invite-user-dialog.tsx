
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MailPlus, Send, Info, CheckCircle, RotateCw } from 'lucide-react';
import { useState } from 'react';

const inviteUserSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type InviteUserFormValues = z.infer<typeof inviteUserSchema>;

interface InviteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hubCode: string;
  onInviteSubmit: (email: string) => void;
}

export function InviteUserDialog({
  open,
  onOpenChange,
  hubCode,
  onInviteSubmit,
}: InviteUserDialogProps) {
  const [invitationSentTo, setInvitationSentTo] = useState<string | null>(null);

  const form = useForm<InviteUserFormValues>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = (values: InviteUserFormValues) => {
    onInviteSubmit(values.email);
    setInvitationSentTo(values.email);
    form.reset();
  };

  const handleSendAnother = () => {
    setInvitationSentTo(null);
    form.reset(); // Ensure form is clear for next input
  };

  // Handle dialog close/open change
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset internal state when dialog is closed externally or by its close button
      setInvitationSentTo(null);
      form.reset();
    }
    onOpenChange(isOpen);
  };


  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-primary flex items-center gap-2">
            <MailPlus className="h-6 w-6" />
            Invite New Member to Hub
          </DialogTitle>
          {!invitationSentTo && (
            <DialogDescription>
              Enter the email address of the person you want to invite. They will receive an email (mock) with the Hub Code to join.
            </DialogDescription>
          )}
        </DialogHeader>

        {invitationSentTo ? (
          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center text-center p-4 bg-green-500/10 rounded-lg border border-green-500/30">
              <CheckCircle className="h-12 w-12 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-primary">Invitation Sent!</h3>
              <p className="text-sm text-muted-foreground">
                A (mock) invitation with Hub Code <strong className="text-primary font-mono">{hubCode}</strong> has been sent to <strong className="text-primary">{invitationSentTo}</strong>.
              </p>
            </div>
            <Button onClick={handleSendAnother} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <RotateCw className="mr-2 h-4 w-4" />
              Send Another Invitation
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pt-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="invitee@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-start p-3 text-xs text-muted-foreground bg-secondary/50 rounded-md border border-border">
                  <Info className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary"/>
                  <span>The invitee will receive your Hub Code: <strong className="text-primary font-mono">{hubCode}</strong>. They can use this code on the "Join Hub" page.</span>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Send className="mr-2 h-4 w-4" />
                  Send Invitation
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
        {invitationSentTo && (
           <DialogFooter className="mt-0 pt-0">
             <DialogClose asChild>
                <Button type="button" variant="outline" className="w-full">
                  Close
                </Button>
              </DialogClose>
           </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
