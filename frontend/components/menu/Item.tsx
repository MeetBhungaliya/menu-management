import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Item as ItemType } from '../../app/[menuid]/types';
import { ChevronDown } from 'lucide-react';

interface ItemProps {
  data: ItemType;
}

const Item = ({ data }: ItemProps) => {
  const { depth } = data;

  const root =
    data.depth === null && data.parent_id === null && data.menu_id === null;

  const MENU_HEIGHT = 36;

  return (
    <Collapsible className="relative">
      <div className="flex items-center">
        {data.children.length || (root && !data.children.length) ? null : (
          <div className="size-4 relative">
            <div className="w-full h-[1px] absolute left-0 bg-[#98A2B3] top-1/2 -translate-y-1/2" />
          </div>
        )}
        <CollapsibleTrigger className="flex items-center gap-x-3 pl-2 pr-4 py-2 bg-white hover:bg-gray-50 relative">
          {depth ? (
            <div className="w-2 h-[1px] absolute left-0 bg-[#98A2B3] top-1/2 -translate-y-1/2" />
          ) : null}
          {data.children.length ? (
            <ChevronDown className="size-4 text-[#101828]" />
          ) : null}
          <span className="text-sm">{data.name}</span>
        </CollapsibleTrigger>
      </div>
      {data.children.length ? (
        <CollapsibleContent className="ml-4 relative">
          <div
            style={{
              height: `calc(100% - ${MENU_HEIGHT / 2}px)`,
              bottom: `${MENU_HEIGHT / 2}px`,
            }}
            className="w-[1px] absolute bg-[#98A2B3] left-0 z-10"
          />
          {data.children.map((data: ItemType) => {
            return <Item key={data.id} data={data} />;
          })}
        </CollapsibleContent>
      ) : null}
    </Collapsible>
  );
};

export default Item;
