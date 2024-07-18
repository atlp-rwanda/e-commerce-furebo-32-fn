import baseAPI from '../api';

const token = window.localStorage.getItem('token');

const cartEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    viewCart: builder.query<any, { params?: any }>({
      query: ({ params }) => ({
        url: '/api/cart/view',
        method: 'GET',
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['cart'],
    }),
    addToCart: builder.mutation<any, { params?: any; productId: string }>({
      query: ({ params, productId }) => ({
        url: `/api/cart/add/${productId}`,
        method: 'POST',
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['cart'],
    }),
    resetCart: builder.mutation<any, {  }>({
      query: () => ({
        url: `/api/cart/clear`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['cart'],
    }),
  }),
});

export const { useViewCartQuery, useAddToCartMutation,useResetCartMutation } = cartEndpoints;