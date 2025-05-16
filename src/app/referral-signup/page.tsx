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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Puzzle } from 'lucide-react'; // Changed from Baby to Puzzle

const referralSignupFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters."}),
  confirmPassword: z.string(),
  referrerEmail: z.string().email({ message: "Please enter a valid referrer email." }).optional(),
  referralCode: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ReferralSignupFormValues = z.infer<typeof referralSignupFormSchema>;

export default function ReferralSignupPage() {
  const { toast } = useToast();
  const form = useForm<ReferralSignupFormValues>({
    resolver: zodResolver(referralSignupFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      referrerEmail: '',
      referralCode: '',
    },
  });

  function onSubmit(data: ReferralSignupFormValues) {
    console.log(data);
    // Mock submission
    toast({
      title: 'Sign Up Request Submitted (Mock)',
      description: 'Your request to join has been sent. An admin will review it shortly.',
    });
    form.reset();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary pt-12 px-6 pb-6">
       <Link href="/" className="flex items-center gap-2 text-2xl font-semibold text-primary mb-8">
          <Puzzle className="h-8 w-8" /> {/* Changed from Baby to Puzzle */}
          <span>Babysitter Hub</span>
        </Link>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Join Our Community</CardTitle>
          <CardDescription>
            New members must be recommended by an existing member or have a referral code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="referrerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referrer's Email (Optional)</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="referrer@example.com" {...field} />
                    </FormControl>
                     <FormDescription>
                        The email address of the member who referred you.
                      </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="referralCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referral Code (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter referral code if you have one" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Request to Join
              </Button>
            </form>
          </Form>
           <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Button variant="link" asChild className="text-primary p-0 h-auto">
              <Link href="/dashboard">
                Log In
              </Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
