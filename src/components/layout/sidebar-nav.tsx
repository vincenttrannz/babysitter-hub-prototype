
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem, NavItemGroup } from '@/types';
import { cn } from '@/lib/utils';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import React from 'react';

interface SidebarNavProps {
  itemGroups: NavItemGroup[];
}

export function SidebarNav({ itemGroups }: SidebarNavProps) {
  const pathname = usePathname();

  if (!itemGroups?.length) {
    return null;
  }

  return (
    <SidebarMenu> {/* This is the UL */}
      {itemGroups.map((group, groupIndex) => (
        <React.Fragment key={groupIndex}>
          {group.groupTitle && (
            <li 
              className="px-3 pt-4 pb-2 text-xs font-semibold text-sidebar-foreground/60 tracking-wider uppercase group-data-[state=collapsed]:opacity-0 transition-opacity duration-100"
            >
              {group.groupTitle}
            </li>
          )}
          {group.items.map((item, itemIndex) => {
            const Icon = item.icon;
            const isActive = item.href === "/" 
              ? pathname === item.href 
              : pathname.startsWith(item.href);
            
            return (
              <SidebarMenuItem key={`${groupIndex}-${itemIndex}`}> {/* This is an LI */}
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={{ content: item.title, side: 'right', align: 'center' }}
                  className={cn(
                    "justify-start w-full", 
                    isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Link href={item.disabled ? '#' : item.href}>
                    <Icon className="h-5 w-5" />
                    <span className="group-data-[state=expanded]:opacity-100 group-data-[state=collapsed]:opacity-0 transition-opacity duration-100">
                      {item.title}
                    </span>
                    {item.label && (
                      <span className="ml-auto text-xs group-data-[state=expanded]:opacity-100 group-data-[state=collapsed]:opacity-0 transition-opacity duration-100">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </React.Fragment>
      ))}
    </SidebarMenu>
  );
}
