
import type { NavItem, NavItemGroup } from '@/types';
import { LayoutDashboard, CalendarPlus, ListChecks, ShieldCheck, UserPlus, Users, Puzzle, ClipboardList, PlusCircle } from 'lucide-react';

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

// Nav groups common to all authenticated users
export const navItemGroups: NavItemGroup[] = [
  {
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        description: "View your points and activity.",
      },
    ],
  },
  {
    groupTitle: "Jobs",
    items: [
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
    ],
  },
  {
    groupTitle: "Sessions",
    items: [
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
    ],
  },
];

// Base items for the "General" group, visible to all users
export const generalGroupBase: NavItemGroup = {
  groupTitle: "General",
  items: [
    {
      title: "Members",
      href: "/members",
      icon: Users,
      description: "View group members.",
    },
  ],
};

// Items to be added to the "General" group for admins only
export const adminOnlyGeneralItems: NavItem[] = [
  {
    title: "Admin Panel",
    href: "/admin",
    icon: ShieldCheck,
    description: "Manage members and settings.",
  },
];

// Public navigation items (e.g., for landing page, sign-up)
export const publicNavItems: NavItem[] = [
   {
    title: "Sign Up",
    href: "/signup",
    icon: UserPlus,
    description: "Join Babysitter Hub.",
  },
];
