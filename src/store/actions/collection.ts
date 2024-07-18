import baseAPI from '../api';
const token =window.localStorage.getItem('token');
const collectionEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCollections: builder.query<any, { params?: any }>({
      query: ({ params }) => ({
        url: '/api/collection',
        method: 'GET',
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['collection'],
    }),
    createCollection: builder.mutation<
      any,
      { CollectionName: string; description: string }
    >({
      query: ({ CollectionName, description }) => ({
        url: '/api/createCollection',
        method: 'POST',
        body: { CollectionName, description },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['collection'],
    }),
    updateCollection: builder.mutation<
      any,
      { id: string; CollectionName: string; description: string }
    >({
      query: ({ id, CollectionName, description }) => ({
        url: `/api/updateCollection/${id}`,
        method: 'PUT',
        body: { CollectionName, description },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['collection'],
    }),
    deleteCollection: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/api/deleteCollection/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['collection'],
    }),
  }),
});

export const {
  useCreateCollectionMutation,
  useGetCollectionsQuery,
  useUpdateCollectionMutation,
  useDeleteCollectionMutation,
} = collectionEndpoints;
