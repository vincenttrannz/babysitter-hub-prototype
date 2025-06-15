
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Puzzle, Users, PlusCircle } from 'lucide-react';

export default function HubSelectionPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary pt-12 px-6 pb-6">
      <Link href="/" className="flex items-center gap-2 text-2xl font-semibold text-primary mb-8">
        <Puzzle className="h-8 w-8" />
        <span>Babysitter Hub</span>
      </Link>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Welcome to the Hub!</CardTitle>
          <CardDescription>
            To get started, you can create a new childcare hub for your community or join an existing one.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-base py-6">
            <Link href="/create-hub">
              <PlusCircle className="mr-2 h-5 w-5" />
              Create a New Hub
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full text-base py-6">
            <Link href="/join-hub">
              <Users className="mr-2 h-5 w-5" />
              Join an Existing Hub
            </Link>
          </Button>
        </CardContent>
      </Card>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        This is where your babysitting exchange journey begins!
      </p>
    </div>
  );
}
