import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Folder, LayoutGrid } from 'lucide-react';

const index = () => {
  return (
    <>
      <Breadcrumb className="py-[30px]">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Folder className="stroke-[#D0D5DD] fill-[#D0D5DD]" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-[#D0D5DD]">
            /
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">Menus</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className=" py-4 flex items-center gap-x-4">
        <div className="size-[52px] rounded-full flex justify-center items-center bg-[#253BFF]">
          <LayoutGrid className="stroke-white fill-white" />
        </div>
        <h1 className="text-2xl font-bold">Menus</h1>
      </div>
    </>
  );
};

export default index;
