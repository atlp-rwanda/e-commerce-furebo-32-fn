import baseAPI from '../api';

const searchEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    searchProducts: builder.query<
      any,
      { search: string; min: any; max: any; category: string }
    >({
      query: ({ search, min, max, category }) => ({
        url: '/searchProduct',
        method: 'POST',
        params: {
          search,
          min,
          max,
          category,
        },
      }),
    }),
  }),
});

export const { useSearchProductsQuery } = searchEndpoints;
