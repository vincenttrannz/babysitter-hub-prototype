
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Puzzle, Users, Gift, CalendarPlus, ListChecks, LayoutDashboard, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-primary text-primary-foreground shadow-md">
        <Link href="#" className="flex items-center justify-center gap-2">
          <Puzzle className="h-7 w-7" />
          <span className="text-xl font-bold">Babysitter Hub</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
            How It Works
          </Link>
          <Button asChild variant="secondary" className="text-primary hover:bg-accent hover:text-accent-foreground">
            <Link href="/dashboard">Login / Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="container flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-primary sm:text-5xl xl:text-6xl/none">
                    Childcare Exchange Made Easy
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Babysitter Hub is a community-based babysitting exchange. Join or start a trusted community, earn points by helping others, and spend them when you need a hand.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/referral-signup">Join or Start a Hub</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                    <Link href="#how-it-works">Learn More</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/babysitter-hub.firebasestorage.app/o/home_page_banner.png?alt=media&token=3e682025-cb8e-436e-b183-cc9a82d2419a"
                alt="Illustration of a caregiver and child"
                data-ai-hint="caregiver child"
                width={600}
                height={400}
                className="mx-auto overflow-hidden rounded-xl lg:order-last shadow-lg"
              />
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl">Everything You Need for Fair Childcare Exchange</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides all the tools for a seamless and trustworthy babysitting cooperative.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 mt-12">
              <div className="grid gap-1 p-4 rounded-lg shadow-md bg-card">
                <Users className="h-8 w-8 text-accent" />
                <h3 className="text-lg font-bold text-card-foreground">Referral-Based Sign-Up</h3>
                <p className="text-sm text-muted-foreground">Join a trusted network of parents through recommendations.</p>
              </div>
              <div className="grid gap-1 p-4 rounded-lg shadow-md bg-card">
                <Gift className="h-8 w-8 text-accent" />
                <h3 className="text-lg font-bold text-card-foreground">Points System</h3>
                <p className="text-sm text-muted-foreground">Earn and spend points for babysitting, ensuring fairness.</p>
              </div>
              <div className="grid gap-1 p-4 rounded-lg shadow-md bg-card">
                <CalendarPlus className="h-8 w-8 text-accent" />
                <h3 className="text-lg font-bold text-card-foreground">Session Logging</h3>
                <p className="text-sm text-muted-foreground">Easily log sessions with automatic point calculation.</p>
              </div>
              <div className="grid gap-1 p-4 rounded-lg shadow-md bg-card">
                <ListChecks className="h-8 w-8 text-accent" />
                <h3 className="text-lg font-bold text-card-foreground">Dual Confirmation</h3>
                <p className="text-sm text-muted-foreground">Both parties confirm sessions for transparency and trust.</p>
              </div>
              <div className="grid gap-1 p-4 rounded-lg shadow-md bg-card">
                <LayoutDashboard className="h-8 w-8 text-accent" />
                <h3 className="text-lg font-bold text-card-foreground">Points Dashboard</h3>
                <p className="text-sm text-muted-foreground">Track your balance and session history at a glance.</p>
              </div>
              <div className="grid gap-1 p-4 rounded-lg shadow-md bg-card">
                <ShieldCheck className="h-8 w-8 text-accent" />
                <h3 className="text-lg font-bold text-card-foreground">Admin Controls</h3>
                <p className="text-sm text-muted-foreground">Community admins manage members and platform settings.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter text-primary md:text-4xl/tight">How Babysitter Hub Works</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Simple steps to join and participate in our childcare exchange community. New members start with 10 points!
              </p>
            </div>
            <div className="mx-auto w-full max-w-4xl space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card shadow-md">
                        <div className="p-3 leading-[0.5] rounded-full bg-accent text-accent-foreground">1</div>
                        <h3 className="font-semibold text-card-foreground">Get Referred</h3>
                        <p className="text-sm text-muted-foreground">New members join via a referral from an existing member.</p>
                    </div>
                    <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card shadow-md">
                        <div className="p-3 leading-[0.5] rounded-full bg-accent text-accent-foreground">2</div>
                        <h3 className="font-semibold text-card-foreground">Offer or Request Care</h3>
                        <p className="text-sm text-muted-foreground">Use group messaging to arrange babysitting sessions.</p>
                    </div>
                    <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card shadow-md">
                        <div className="p-3 leading-[0.5] rounded-full bg-accent text-accent-foreground">3</div>
                        <h3 className="font-semibold text-card-foreground">Log & Confirm</h3>
                        <p className="text-sm text-muted-foreground">Log sessions and confirm them. Points are auto-calculated.</p>
                    </div>
                </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-primary text-primary-foreground">
        <p className="text-xs">&copy; {new Date().getFullYear()} Babysitter Hub. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
