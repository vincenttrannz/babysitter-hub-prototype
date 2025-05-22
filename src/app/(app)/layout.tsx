
'use client';
import type { ReactNode } from 'react';
import { Puzzle } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AppHeader } from '@/components/layout/app-header';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { navItemGroups, adminNavItemGroups } from '@/config/site'; // Updated import
import Link from 'next/link';
import { mockAdminUser } from '@/lib/mock-data';
import type { NavItemGroup } from '@/types'; // Import NavItemGroup

export default function AppLayout({ children }: { children: ReactNode }) {
  const currentUser = mockAdminUser;
  const isAdmin = currentUser.isAdmin ?? false;
  
  const allNavGroups: NavItemGroup[] = isAdmin 
    ? [...navItemGroups, ...adminNavItemGroups] 
    : navItemGroups;

  return (
    <SidebarProvider open={true} defaultOpen={true}>
      <Sidebar side="left" variant="sidebar" collapsible="icon" className="border-r">
        <SidebarHeader className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold text-sidebar-foreground">
            <Puzzle className="h-7 w-7 text-sidebar-primary" />
            <span className="group-data-[state=expanded]:opacity-100 group-data-[state=collapsed]:opacity-0 transition-opacity duration-200">
              Babysitter Hub
            </span>
          </Link>
        </SidebarHeader>
        <Separator className="bg-sidebar-border" />
        <SidebarContent className="p-2">
          <SidebarNav itemGroups={allNavGroups} /> {/* Changed prop name */}
        </SidebarContent>
        <Separator className="bg-sidebar-border" />
        <SidebarFooter className="p-4">
          <Button variant="outline" className="w-full group-data-[state=collapsed]:hidden text-foreground">
            Need Help?
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
