import baseAPI from '../api';

const token = window.localStorage.getItem('token');

const orderEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersByUser: builder.query<any, { userId: string }>({
      query: ({ userId }) => ({
        url: `/api/orders/${userId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useGetOrdersByUserQuery } = orderEndpoints;
