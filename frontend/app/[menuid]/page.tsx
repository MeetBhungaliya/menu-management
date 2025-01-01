'use client';

import Item from '@/components/menu/Item';
import { Button } from '@/components/ui/button';
import { useGetMenuItemsQuery } from '@/redux/api/managementApi';
import { useParams } from 'next/navigation';
import Loading from './loading';
import { Item as ItemType } from './types';

const Page = () => {
  const { menuid } = useParams<{ menuid: string }>();

  const { data, isLoading } = useGetMenuItemsQuery(menuid, {
    skip: typeof menuid !== 'string',
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="w-full my-6 flex gap-x-2">
        <Button className="px-6 text-[14px] rounded-full font-semibold">
          Expand All
        </Button>
        <Button variant="outline" className="px-6 rounded-full font-semibold">
          Collapse All
        </Button>
      </div>

      {data?.data.map((data: ItemType) => {
        return <Item key={data.id} data={data} />;
      })}
    </>
  );
};

export default Page;
