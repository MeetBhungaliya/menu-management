import { configureStore } from '@reduxjs/toolkit';
import { managementApi } from './api/managementApi';
import menuSlice from './slice/menuSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [managementApi.reducerPath]: managementApi.reducer,
      menus: menuSlice,
    },

    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(managementApi.middleware),
  });
};

const store = makeStore();

setupListeners(store.dispatch);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export default store;
