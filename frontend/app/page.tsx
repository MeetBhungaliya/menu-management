import Item from '@/components/menu/Item';
import MenuSelector from '@/components/MenuSelector';
import { Button } from '@/components/ui/button';
import React from 'react';

const page = async () => {
  const res = await fetch(
    'http://localhost:3000/api/v1/menu/cm59fkd2d000012vo680nsvh6'
  );
  const list = await res.json();

  return (
    <div>
      <MenuSelector />

      <div className="w-full my-6 flex gap-x-2">
        <Button className="px-6 text-[14px] rounded-full font-semibold">
          Expand All
        </Button>
        <Button variant="outline" className="px-6 rounded-full font-semibold">
          Collapse All
        </Button>
      </div>

      {[list].map((data: unknown) => {
        return <Item key={data.id} data={data} />;
      })}
    </div>
  );
};

export default page;
