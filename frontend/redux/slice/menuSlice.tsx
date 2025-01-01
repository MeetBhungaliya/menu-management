import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Item } from '@/app/[menuid]/types';

interface MenuItemState {
  loading: boolean;
  data: Item[] | null;
}

const initialState: MenuItemState = {
  loading: false,
  data: null,
};

export const menuItemSlice = createSlice({
  name: 'menu-item',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setItems } = menuItemSlice.actions;

export const selectCount = (state: RootState) => state.menus.data;

export default menuItemSlice.reducer;
