
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
import { MailPlus, Send, Info } from 'lucide-react';

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
  const form = useForm<InviteUserFormValues>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = (values: InviteUserFormValues) => {
    onInviteSubmit(values.email);
    form.reset();
    // onOpenChange(false); // Parent component will handle closing via toast callback
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-primary flex items-center gap-2">
            <MailPlus className="h-6 w-6" />
            Invite New Member to Hub
          </DialogTitle>
          <DialogDescription>
            Enter the email address of the person you want to invite. They will receive an email (mock) with the Hub Code to join.
          </DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
}
