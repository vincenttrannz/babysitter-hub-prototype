
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Puzzle, Users, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { mockUser } from '@/lib/mock-data'; // To show a mock hub name on join

const joinHubFormSchema = z.object({
  hubCode: z.string().length(8, { message: "Hub code must be exactly 8 characters." }).regex(/^[A-Z0-9]{8}$/, { message: "Hub code must be 8 uppercase alphanumeric characters." }),
});

type JoinHubFormValues = z.infer<typeof joinHubFormSchema>;

export default function JoinHubPage() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<JoinHubFormValues>({
    resolver: zodResolver(joinHubFormSchema),
    defaultValues: {
      hubCode: '',
    },
  });

  function onSubmit(data: JoinHubFormValues) {
    console.log("Join Hub Data:", data);
    // Mock successful join. In a real app, you'd validate the code against a backend.
    // For this prototype, we'll assume the join is successful and the user joins Alice's Hub for demonstration.
    const targetHubName = mockUser.hubName || "the Target Hub"; // Use Alice's hub name or a fallback

    toast({
      title: 'Joined Hub (Mock)!',
      description: `You have successfully joined "${targetHubName}" with code ${data.hubCode}.`,
      duration: 7000,
    });
    // In a real app, you'd associate the user with the hub.
    router.push('/dashboard');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary pt-12 px-6 pb-6">
      <Link href="/" className="flex items-center gap-2 text-2xl font-semibold text-primary mb-8">
        <Puzzle className="h-8 w-8" />
        <span>Babysitter Hub</span>
      </Link>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Join an Existing Hub</CardTitle>
          <CardDescription>
            Enter the 8-character Hub Code provided by an existing member or admin to join their community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="hubCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hub Code</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="ABC123XYZ" 
                        {...field} 
                        maxLength={8} 
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())} // Auto-uppercase
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Users className="mr-2 h-4 w-4" /> Join Hub
              </Button>
            </form>
          </Form>
          <Button variant="link" asChild className="mt-6 text-primary p-0 h-auto w-full flex items-center justify-center">
            <Link href="/hub-selection">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Hub Selection
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
