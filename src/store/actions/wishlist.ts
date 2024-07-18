import baseAPI from '../api';

const token = window.localStorage.getItem('token');
const wishlistEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<any, void>({
      query: () => ({
        url: '/api/wishlist',
        method: 'GET',
      }),
    }),
    addToWishlist: builder.mutation<any, { productId: string }>({
      query: ({ productId }) => ({
        url: '/api/wishlist',
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
    }),
  }),
});

export const { useGetWishlistQuery, useAddToWishlistMutation, useDeleteFromWishlistMutation } = wishlistEndpoints;
