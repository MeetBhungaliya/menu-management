'use client';

import { Button } from '@/components/ui/button';
import { SidebarHeader, useSidebar } from '@/components/ui/sidebar';
import { ListCollapse } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Header = () => {
  const { toggleSidebar } = useSidebar();

  return (
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
  );
};

export default Header;
