'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronDown } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu } from './types';

interface MenuSelectorProps {
  data: Menu[];
}

const MenuSelector = ({ data }: MenuSelectorProps) => {
  const router = useRouter();
  const { menuid } = useParams<{ menuid: string }>();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(menuid ?? '');

  const handleChange = (currentValue: string) => {
    setValue(currentValue === value ? '' : currentValue);
    setOpen(false);
    router.push(currentValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-[350px] justify-between"
        >
          {value
            ? data.find((menu: Menu) => menu.id === value)?.name
            : 'Select menu...'}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{ width: 'var(--radix-popover-content-available-width)' }}
        className="w-full max-w-[350px] p-0"
      >
        <Command>
          <CommandInput placeholder="Search menu..." />
          <CommandList>
            <CommandEmpty>No menu found.</CommandEmpty>
            <CommandGroup>
              {data.map((menu: Menu) => (
                <CommandItem
                  key={menu.id}
                  value={menu.id}
                  onSelect={handleChange}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === menu.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {menu.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MenuSelector;
