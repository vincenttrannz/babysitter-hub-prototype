
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { mockMembers, mockUser } from '@/lib/mock-data'; // Placeholder members
import type { Session, User } from '@/types';

const sessionFormSchema = z.object({
  role: z.enum(['babysitter', 'parent'], {
    required_error: 'You need to select your role.',
  }),
  otherPartyId: z.string({ required_error: 'Please select the other party.' }),
  date: z.date({ required_error: 'A date for the session is required.' }),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),
  notes: z.string().max(500, "Notes must be 500 characters or less.").optional(),
})
.refine(data => {
  if (data.date && data.startTime && data.endTime) {
    const startDate = new Date(data.date);
    const [startHours, startMinutes] = data.startTime.split(':').map(Number);
    startDate.setHours(startHours, startMinutes);

    const endDate = new Date(data.date);
    const [endHours, endMinutes] = data.endTime.split(':').map(Number);
    endDate.setHours(endHours, endMinutes);
    
    // Handle overnight sessions correctly for comparison
    if (endDate <= startDate) {
        endDate.setDate(endDate.getDate() + 1);
    }
    return endDate > startDate;
  }
  return true;
}, {
  message: "End time must be after start time.",
  path: ["endTime"],
});


type SessionFormValues = z.infer<typeof sessionFormSchema>;

const defaultValues: Partial<SessionFormValues> = {
  notes: '',
};

export function LogSessionForm() {
  const { toast } = useToast();
  const [calculatedPoints, setCalculatedPoints] = useState<number | null>(null);
  const currentUser = mockUser; // Assuming mockUser is the currently logged-in user
  
  const form = useForm<SessionFormValues>({
    resolver: zodResolver(sessionFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { watch } = form;
  const startTime = watch('startTime');
  const endTime = watch('endTime');
  const date = watch('date');

  useEffect(() => {
    if (date && startTime && endTime && /^([01]\d|2[0-3]):([0-5]\d)$/.test(startTime) && /^([01]\d|2[0-3]):([0-5]\d)$/.test(endTime)) {
      const startDate = new Date(date);
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      startDate.setHours(startHours, startMinutes, 0, 0);

      const endDate = new Date(date); 
      const [endHours, endMinutes] = endTime.split(':').map(Number);
      endDate.setHours(endHours, endMinutes, 0, 0);

      // Handle overnight sessions by incrementing day if end time is earlier than start time
      if (endDate <= startDate) {
        endDate.setDate(endDate.getDate() + 1);
      }
      
      if (endDate <= startDate) { // Check again after potential day increment
        setCalculatedPoints(null); 
        return;
      }

      let points = 0;
      let current = new Date(startDate);

      while (current < endDate) {
        const nextHalfHour = new Date(current);
        nextHalfHour.setMinutes(current.getMinutes() + 30);

        if (nextHalfHour > endDate) break; 

        const hour = current.getHours();
        points += (hour >= 23 || hour < 7) ? 2 : 1; // Points: 2 for 11 PM - 7 AM, 1 otherwise
        
        current = nextHalfHour;
      }
      setCalculatedPoints(points > 0 ? points : null);
    } else {
      setCalculatedPoints(null);
    }
  }, [date, startTime, endTime]);


  function onSubmit(data: SessionFormValues) {
    const otherParty = availableMembers.find(m => m.id === data.otherPartyId);
    if (!otherParty || calculatedPoints === null || calculatedPoints <= 0) {
        toast({ variant: "destructive", title: "Error", description: "Could not log session. Please check details."});
        return;
    }

    const newSession: Partial<Session> = { // Using Partial as ID, createdAt etc. would be backend generated
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        points: calculatedPoints,
        notes: data.notes,
        status: 'pending_parent', // Always pending_parent for manual logs, parent confirms spend.
    };

    if (data.role === 'parent') { // Current user was the parent
        newSession.parentId = currentUser.id;
        newSession.parentName = currentUser.name;
        newSession.babysitterId = otherParty.id;
        newSession.babysitterName = otherParty.name;
        
        toast({
            title: 'Session Logged (As Parent)',
            description: `Please go to 'Confirm Sessions' to confirm this session and transfer ${calculatedPoints} points to ${otherParty.name}.`,
            duration: 7000,
        });
        // Mock notification to babysitter
        toast({
            title: `Notification for ${otherParty.name} (Mock)`,
            description: `${currentUser.name} has logged a session they had with you on ${format(data.date, 'MMM dd')}. It's awaiting their confirmation before ${calculatedPoints} points are awarded to you.`,
            duration: 9000,
        });

    } else { // Current user was the babysitter
        newSession.babysitterId = currentUser.id;
        newSession.babysitterName = currentUser.name;
        newSession.parentId = otherParty.id;
        newSession.parentName = otherParty.name;

        toast({
            title: 'Session Logged (As Babysitter)',
            description: `${otherParty.name} has been notified to confirm this session so you can receive ${calculatedPoints} points.`,
            duration: 7000,
        });
        // Mock notification to parent
        toast({
            title: `Notification for ${otherParty.name} (Mock)`,
            description: `${currentUser.name} has logged a babysitting session they provided for you on ${format(data.date, 'MMM dd')} (${calculatedPoints} points). Please go to 'Confirm Sessions' to review and confirm it.`,
            duration: 9000,
        });
    }

    console.log("Mock Logged Session:", { ...newSession, id: `mockSession_${Date.now()}` });
    // In a real app, you'd send this `newSession` to your backend to be saved.
    // For this prototype, we could add it to mockSessions if we were managing state globally,
    // but for now, the toasts and console log will suffice.

    form.reset();
    setCalculatedPoints(null);
  }

  const availableMembers = mockMembers.filter(member => member.id !== currentUser.id);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Your Role in this Session</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="babysitter" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      I was the Babysitter (Earned Points)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="parent" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      I was the Parent (Spent Points)
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="otherPartyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Other Party</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the parent or babysitter" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableMembers.map(member => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Who did you babysit for, or who babysat for you?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Session</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full md:w-[280px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('2020-01-01') // Allow reasonable past dates
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time (HH:MM)</FormLabel>
                <FormControl>
                  <Input type="time" placeholder="e.g., 18:30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time (HH:MM)</FormLabel>
                <FormControl>
                  <Input type="time" placeholder="e.g., 21:00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {calculatedPoints !== null && calculatedPoints > 0 && (
          <div className="p-4 bg-secondary rounded-md">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium text-secondary-foreground">
                Estimated Points for this session: <span className="font-bold text-lg text-primary">{calculatedPoints}</span>
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Points are 1 per half hour (regular hours) and 2 per half hour (e.g. 11 PM - 7 AM). Final points subject to confirmation by the parent.
            </p>
          </div>
        )}


        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any details about the session..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                These notes will be visible to the other party upon confirmation.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90" disabled={!calculatedPoints || calculatedPoints <= 0}>
          Log Session
        </Button>
      </form>
    </Form>
  );
}

