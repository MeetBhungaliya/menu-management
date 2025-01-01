import { Menu } from '@/components/menuselector/types';

export interface Item extends Menu {
  parent_id: string | null;
  menu_id: string | null;
  depth: number | null;
  children: Item[] | [];
}

export interface ItemsResponse {
  success: boolean;
  message: string;
  data: Item[];
}
