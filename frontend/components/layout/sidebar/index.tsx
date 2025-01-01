'use client';

import { Item } from '@/app/[menuid]/types';
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetMenuItemsQuery } from '@/redux/api/managementApi';
import { Collapsible } from '@radix-ui/react-collapsible';
import { Folder, LayoutGrid } from 'lucide-react';
import { useParams } from 'next/navigation';
import Header from './Header';

const Index = () => {
  const { menuid } = useParams<{ menuid: string }>();

  const { data, isLoading } = useGetMenuItemsQuery(menuid, {
    skip: typeof menuid !== 'string',
  });

  return (
    <Sidebar>
      <Header />
      <SidebarContent className="px-4 py-[10px] bg-[#101828]">
        <SidebarMenu>
          {isLoading || !data
            ? Array.from({ length: 5 }).map((_, index) => (
                <SidebarMenuItem key={index} className="list-none rounded-lg ">
                  <Skeleton className="w-full h-11 bg-[#1d2939]" />
                </SidebarMenuItem>
              ))
            : data.data.map((data: Item) => {
                return (
                  <Collapsible key={data.id}>
                    <CollapsibleTrigger
                      asChild
                      className="active:bg-[#9FF443] data-[state=open]:hover:bg-[#9FF443] hover:bg-[#9FF443] data-[state=open]:bg-[#1d2939] group/trigger transition-colors"
                    >
                      <SidebarMenuButton className="h-auto p-3 rounded-lg group-data-[state=open]/trigger:rounded-none">
                        <Folder className="fill-white stroke-white group-hover/trigger:fill-black group-hover/trigger:stroke-black transition-colors" />
                        <span className="font-semibold text-white group-hover/trigger:text-black transition-colors">
                          {data.name}
                        </span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="data-[state=open]:bg-[#1d2939]">
                      <SidebarMenuSub className="m-0 p-0 border-none">
                        {data.children.map((data: Item) => {
                          return (
                            <SidebarMenuSubItem
                              key={data.id}
                              className="p-3 rounded-lg flex items-center gap-2"
                            >
                              <LayoutGrid className="size-4 stroke-[#667085]" />
                              <span className="text-sm font-semibold text-[#667085]">
                                {data.name}
                              </span>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}

          {/* <Collapsible className="group/collapsible">
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
          </Collapsible> */}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default Index;
