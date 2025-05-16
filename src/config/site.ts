import type { NavItem } from '@/types';
import { LayoutDashboard, CalendarPlus, ListChecks, ShieldCheck, UserPlus, Users } from 'lucide-react';

export const siteConfig = {
  name: "Family Time Bank",
  description: "A community-based babysitting exchange platform.",
  url: "https://familytimebank.example.com", // Replace with your actual URL
  ogImage: "https://familytimebank.example.com/og.jpg", // Replace with your actual OG image URL
  links: {
    twitter: "https://twitter.com/example", // Replace with your Twitter if any
    github: "https://github.com/example/family-time-bank", // Replace with your GitHub if any
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
    description: "Join Family Time Bank.",
  },
];
