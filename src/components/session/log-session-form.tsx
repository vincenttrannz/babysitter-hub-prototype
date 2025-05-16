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

const sessionFormSchema = z.object({
  role: z.enum(['babysitter', 'parent'], {
    required_error: 'You need to select your role.',
  }),
  otherPartyId: z.string({ required_error: 'Please select the other party.' }),
  date: z.date({ required_error: 'A date for the session is required.' }),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),
  notes: z.string().max(500, "Notes must be 500 characters or less.").optional(),
});

type SessionFormValues = z.infer<typeof sessionFormSchema>;

const defaultValues: Partial<SessionFormValues> = {
  notes: '',
};

export function LogSessionForm() {
  const { toast } = useToast();
  const [calculatedPoints, setCalculatedPoints] = useState<number | null>(null);
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
      startDate.setHours(startHours, startMinutes);

      const endDate = new Date(date); // Assume same day for simplicity, real logic would handle crossing midnight
      const [endHours, endMinutes] = endTime.split(':').map(Number);
      endDate.setHours(endHours, endMinutes);

      if (endDate <= startDate) {
        setCalculatedPoints(null); // Or show error
        return;
      }

      let points = 0;
      let current = new Date(startDate);

      while (current < endDate) {
        const nextHalfHour = new Date(current);
        nextHalfHour.setMinutes(current.getMinutes() + 30);

        if (nextHalfHour > endDate) break; // Don't count partial last interval

        const hour = current.getHours();
        points += (hour >= 0 && hour < 7) || hour >= 23 ? 2 : 1; // Midnight hours example logic
        
        current = nextHalfHour;
      }
      setCalculatedPoints(points);
    } else {
      setCalculatedPoints(null);
    }
  }, [date, startTime, endTime]);


  function onSubmit(data: SessionFormValues) {
    console.log(data);
    toast({
      title: 'Session Logged (Mock)',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify({...data, points: calculatedPoints}, null, 2)}</code>
        </pre>
      ),
    });
    form.reset();
    setCalculatedPoints(null);
  }

  const availableMembers = mockMembers.filter(member => member.id !== mockUser.id);


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
                        'w-[240px] pl-3 text-left font-normal',
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
                      date > new Date() || date < new Date('1900-01-01')
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
        
        {calculatedPoints !== null && (
          <div className="p-4 bg-secondary rounded-md">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium text-secondary-foreground">
                Estimated Points for this session: <span className="font-bold text-lg text-primary">{calculatedPoints}</span>
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Points are 1 per half hour (regular hours) and 2 per half hour (e.g. 11 PM - 7 AM). Final points subject to confirmation.
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
                These notes will be visible to the other party.
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
