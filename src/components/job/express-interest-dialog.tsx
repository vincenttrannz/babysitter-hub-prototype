
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
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

const expressInterestSchema = z.object({
  message: z.string().min(1, "A message is required.").max(500, "Message must be 500 characters or less."),
});

type ExpressInterestFormValues = z.infer<typeof expressInterestSchema>;

interface ExpressInterestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string;
  jobOwnerName: string;
  onExpressInterestSubmit: (jobId: string, message: string) => void;
}

export function ExpressInterestDialog({
  open,
  onOpenChange,
  jobId,
  jobOwnerName,
  onExpressInterestSubmit,
}: ExpressInterestDialogProps) {
  const form = useForm<ExpressInterestFormValues>({
    resolver: zodResolver(expressInterestSchema),
    defaultValues: {
      message: '',
    },
  });

  const handleSubmit = (values: ExpressInterestFormValues) => {
    onExpressInterestSubmit(jobId, values.message);
    form.reset();
    onOpenChange(false); // Close dialog
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-primary">Express Interest in Job</DialogTitle>
          <DialogDescription>
            Send a message to {jobOwnerName} about this job posting.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`Hi ${jobOwnerName}, I'm interested in this babysitting opportunity...`}
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
