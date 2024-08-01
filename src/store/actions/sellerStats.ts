import baseAPI from '../api';

const token = window.localStorage.getItem('token');


const salesEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchSalesData: builder.query<
      any,
      {  startDate: string; endDate: string }
    >({
      query: ({ startDate, endDate }) => ({
        url: `/api/stats?start=${startDate}&end=${endDate}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
          },
      }),
      providesTags: ['products'],
    }),
  }),
});

export const { useFetchSalesDataQuery } = salesEndpoints;