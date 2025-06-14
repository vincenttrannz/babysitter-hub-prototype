
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
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation'; // For redirecting after success

const createJobFormSchema = z.object({
  date: z.date({ required_error: 'A date for the job is required.' })
    .min(new Date(new Date().setHours(0,0,0,0)), { message: "Job date must be today or in the future." }),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),
  numberOfChildren: z.coerce.number().min(1, "Must be at least 1 child.").int("Number of children must be a whole number."),
  childrenAgeRange: z.string().max(50, "Age range must be 50 characters or less.").optional(),
  notes: z.string().max(500, "Notes must be 500 characters or less.").optional(),
})
.refine(data => { 
    if (data.date && data.startTime) {
        const now = new Date();
        const jobDate = new Date(data.date);
        const [startHours, startMinutes] = data.startTime.split(':').map(Number);
        jobDate.setHours(startHours, startMinutes, 0, 0);

        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const inputDateOnly = new Date(data.date.getFullYear(), data.date.getMonth(), data.date.getDate());

        if (inputDateOnly.getTime() === today.getTime()) {
            return jobDate > now;
        }
    }
    return true;
}, {
    message: "Start time must be in the future if the date is today.",
    path: ["startTime"],
})
.refine(data => {
  if (data.date && data.startTime && data.endTime) {
    const startDate = new Date(data.date);
    const [startHours, startMinutes] = data.startTime.split(':').map(Number);
    startDate.setHours(startHours, startMinutes);

    const endDate = new Date(data.date);
    const [endHours, endMinutes] = data.endTime.split(':').map(Number);
    endDate.setHours(endHours, endMinutes);
    
    return endDate > startDate;
  }
  return true;
}, {
  message: "End time must be after start time on the selected date.",
  path: ["endTime"],
})
.refine(data => { // New refinement for 24-hour notice
    if (data.date && data.startTime) {
        const now = new Date();
        const jobStartDateTime = new Date(data.date);
        const [hours, minutes] = data.startTime.split(':').map(Number);
        jobStartDateTime.setHours(hours, minutes, 0, 0);

        const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        return jobStartDateTime >= twentyFourHoursFromNow;
    }
    return true;
}, {
    message: "Job start time must be at least 24 hours from now.",
    path: ["startTime"], 
});


type CreateJobFormValues = z.infer<typeof createJobFormSchema>;

const defaultValues: Partial<CreateJobFormValues> = {
  numberOfChildren: 1,
  childrenAgeRange: '',
  notes: '',
};

export function CreateJobForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<CreateJobFormValues>({
    resolver: zodResolver(createJobFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: CreateJobFormValues) {
    console.log("Job Posting Data:", data);
    toast({
      title: 'Job Posting Created (Mock)',
      description: 'Your job posting has been successfully submitted.',
    });
    form.reset();
    router.push('/job-board'); 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Job</FormLabel>
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
                      date < new Date(new Date().setHours(0,0,0,0)) 
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                When do you need the babysitter? Must be at least 24 hours from now.
              </FormDescription>
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
        
        <FormField
          control={form.control}
          name="numberOfChildren"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Children</FormLabel>
              <FormControl>
                <Input type="number" min="1" placeholder="e.g., 2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="childrenAgeRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Children's Age Range (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 3 and 5 years old" {...field} />
              </FormControl>
              <FormDescription>
                Help sitters understand if they are a good fit.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any important details for the sitter: allergies, routines, etc."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
          <PlusCircle className="mr-2 h-5 w-5" />
          Post Job
        </Button>
      </form>
    </Form>
  );
}
