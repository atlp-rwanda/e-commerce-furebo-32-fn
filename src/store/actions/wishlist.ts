import baseAPI from '../api';

const token = window.localStorage.getItem('token');

const wishlistEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<any, void>({
      query: () => ({
        url: '/api/wishlist',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['wishlist'],
    }),
    addToWishlist: builder.mutation<any, { productId: string }>({
      query: ({ productId }) => ({
        url: `/api/wishlist/${productId}`,
        method: 'POST',
        body: { productId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['wishlist'],
    }),
    deleteFromWishlist: builder.mutation<any, { productId: string }>({
        query: ({ productId }) => ({
            url: `/api/wishlist/${productId}`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
        invalidatesTags: ['wishlist'],
    }),
    clearWishlist: builder.mutation<any, void>({
        query: () => ({
            url: '/api/wishlist',
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
        invalidatesTags: ['wishlist'],
    }),
  }),
});

export const { useGetWishlistQuery, useAddToWishlistMutation, useDeleteFromWishlistMutation, useClearWishlistMutation } = wishlistEndpoints;
