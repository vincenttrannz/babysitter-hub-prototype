
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
import { Puzzle, PlusCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const createHubFormSchema = z.object({
  hubName: z.string().min(3, { message: "Hub name must be at least 3 characters." }).max(50, { message: "Hub name must be 50 characters or less." }),
});

type CreateHubFormValues = z.infer<typeof createHubFormSchema>;

// Function to generate a random 8-character alphanumeric code
const generateHubCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

export default function CreateHubPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const form = useForm<CreateHubFormValues>({
    resolver: zodResolver(createHubFormSchema),
    defaultValues: {
      hubName: '',
    },
  });

  function onSubmit(data: CreateHubFormValues) {
    const hubCode = generateHubCode();
    setGeneratedCode(hubCode); // Store for display, though in a real app this would be saved with the hub.
    console.log("Create Hub Data:", data, "Generated Code:", hubCode);
    
    // Mock successful creation
    toast({
      title: 'Hub Created (Mock)!',
      description: `Your hub "${data.hubName}" has been created. Your Hub Code is: ${hubCode}. You are now an admin of this hub.`,
      duration: 7000,
    });
    // In a real app, you'd save the hub and associate the user as admin.
    // Then redirect.
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
          <CardTitle className="text-2xl font-bold text-primary">Create Your Own Hub</CardTitle>
          <CardDescription>
            Give your new babysitting community a name. A unique Hub Code will be generated for you to share.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="hubName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hub Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Elm Street Parents" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Hub
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
