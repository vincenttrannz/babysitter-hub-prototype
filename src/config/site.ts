import type { NavItem } from '@/types';
import { LayoutDashboard, CalendarPlus, ListChecks, ShieldCheck, UserPlus, Users, Puzzle } from 'lucide-react'; // Added Puzzle

export const siteConfig = {
  name: "Babysitter Hub", // Changed from Family Time Bank
  description: "A community-based babysitting exchange platform.",
  url: "https://babysitterhub.example.com", // Updated placeholder URL
  ogImage: "https://babysitterhub.example.com/og.jpg", // Updated placeholder OG image URL
  links: {
    twitter: "https://twitter.com/example", 
    github: "https://github.com/example/babysitter-hub", // Updated placeholder GitHub
  },
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "View your points and activity.",
  },
  {
    title: "Log Session",
    href: "/log-session",
    icon: CalendarPlus,
    description: "Log a new babysitting session.",
  },
  {
    title: "Confirm Sessions",
    href: "/confirm-sessions",
    icon: ListChecks,
    description: "Confirm pending sessions.",
  },
  {
    title: "Members",
    href: "/members",
    icon: Users,
    description: "View group members.",
  },
];

export const adminNavItems: NavItem[] = [
  {
    title: "Admin Panel",
    href: "/admin",
    icon: ShieldCheck,
    description: "Manage members and settings.",
  },
];

export const publicNavItems: NavItem[] = [
   {
    title: "Sign Up",
    href: "/referral-signup",
    icon: UserPlus,
    description: "Join Babysitter Hub.", // Updated text
  },
];
