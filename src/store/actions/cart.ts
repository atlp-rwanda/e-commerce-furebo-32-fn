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
    checkout: builder.mutation<any, { body: { street: string; city: string; country: string; zipCode: string } }>({
      query: ({ body }) => ({
        url: `/api/checkout`,
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['cart'],
    }),
    completePayment: builder.query<any, { orderId: string }>({
      query: ({ orderId }) => ({
        url: `/api/complete/${orderId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
   cancelledPayment: builder.query<any, { orderId: string }>({
      query: ({ orderId }) => ({
        url: `/api/cancel/${orderId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getOrderStatus: builder.query<any, { orderId: string }>({
      query: ({ orderId }) => ({
        url: `/api/order/${orderId}/status`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useViewCartQuery, useAddToCartMutation,useResetCartMutation, useCheckoutMutation,useLazyCompletePaymentQuery,useGetOrderStatusQuery,useLazyCancelledPaymentQuery } = cartEndpoints;