import { ItemsResponse } from '@/app/[menuid]/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const managementApi = createApi({
  reducerPath: 'management-api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/v1/' }),
  endpoints: builder => ({
    getMenuItems: builder.query<ItemsResponse, string>({
      query: menuid => `item/${menuid}`,
    }),
  }),
});

export const { useGetMenuItemsQuery } = managementApi;
