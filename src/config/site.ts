
import type { NavItem } from '@/types';
import { LayoutDashboard, CalendarPlus, ListChecks, ShieldCheck, UserPlus, Users, Puzzle, ClipboardList, PlusCircle } from 'lucide-react'; // Added Puzzle, ClipboardList, PlusCircle

export const siteConfig = {
  name: "Babysitter Hub",
  description: "A community-based babysitting exchange platform.",
  url: "https://babysitterhub.example.com",
  ogImage: "https://babysitterhub.example.com/og.jpg",
  links: {
    twitter: "https://twitter.com/example",
    github: "https://github.com/example/babysitter-hub",
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
    title: "Job Board",
    href: "/job-board",
    icon: ClipboardList,
    description: "Find babysitting opportunities.",
  },
  {
    title: "Create Job Posting",
    href: "/create-job",
    icon: PlusCircle,
    description: "Post a new babysitting request.",
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
    description: "Join Babysitter Hub.",
  },
];
