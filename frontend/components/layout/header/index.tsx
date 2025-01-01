import { LayoutGrid } from 'lucide-react';
import Breadcrumb from './Breadcrumb';

const index = () => {
  return (
    <>
      <Breadcrumb />

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
