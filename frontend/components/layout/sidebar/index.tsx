'use client';

import { Button } from '@/components/ui/button';
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Collapsible } from '@radix-ui/react-collapsible';
import { Folder, LayoutGrid, ListCollapse } from 'lucide-react';
import Image from 'next/image';

const index = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader className="bg-[#101828] flex-row justify-between">
        <Image width={70} height={21} src="./logo.svg" alt="logo" />
        <Button
          data-sidebar="trigger"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <ListCollapse className="text-white" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SidebarHeader>
      <SidebarContent className="px-4 py-[10px] bg-[#101828]">
        <SidebarMenu>
          <Collapsible className="group/collapsible">
            <SidebarMenuItem className="rounded-lg bg-[#1d2939]">
              <CollapsibleTrigger
                asChild
                className="active:bg-[#1d2939] data-[state=open]:hover:bg-[#1d2939] hover:bg-[#1d2939]"
              >
                <SidebarMenuButton className="h-auto p-3 rounded-lg">
                  <Folder className="fill-white stroke-white" />
                  <span className="font-semibold text-white">Systems</span>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="m-0 p-0 border-none">
                  <SidebarMenuSubItem className="p-3 rounded-lg flex items-center gap-2">
                    <LayoutGrid className="size-4 stroke-[#667085]" />
                    <span className="text-sm font-semibold text-[#667085]">
                      System Code
                    </span>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem className="p-3 rounded-lg flex items-center gap-2">
                    <LayoutGrid className="size-4 stroke-[#667085]" />
                    <span className="text-sm font-semibold text-[#667085]">
                      Properties
                    </span>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem className="p-3 rounded-lg flex items-center gap-2">
                    <LayoutGrid className="size-4 stroke-[#667085]" />
                    <span className="text-sm font-semibold text-[#667085]">
                      API List
                    </span>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default index;
