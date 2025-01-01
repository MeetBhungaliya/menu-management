'use client';

import {
  Breadcrumb as BreadcrumbComponent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Folder } from 'lucide-react';
import { useParams } from 'next/navigation';

const Breadcrumb = () => {
  const { menuid } = useParams();

  return (
    <BreadcrumbComponent className="py-[30px]">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Folder className="stroke-[#D0D5DD] fill-[#D0D5DD]" />
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-[#D0D5DD]">/</BreadcrumbSeparator>
        <BreadcrumbItem>
          {menuid ? (
            <BreadcrumbLink href="/">Menus</BreadcrumbLink>
          ) : (
            <BreadcrumbPage className="font-medium">Menus</BreadcrumbPage>
          )}
        </BreadcrumbItem>

        {menuid ? (
          <>
            <BreadcrumbSeparator className="text-[#D0D5DD]">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium">{menuid}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : null}
      </BreadcrumbList>
    </BreadcrumbComponent>
  );
};

export default Breadcrumb;
