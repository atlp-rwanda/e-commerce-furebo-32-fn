import baseAPI from '../api';

const token = window.localStorage.getItem('token');

const productsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getgetProducts: builder.query<any, { params?: any }>({
      query: ({ params }) => ({
        url: '/api/availableItems',
        method: 'GET',
        params,
      }),
    }),
    getSellerProducts: builder.query<any, { params?: any }>({
      query: ({ params }) => ({
        url: '/api/sellerViewProducts',
        method: 'GET',
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['products'],
    }),
    createProduct: builder.mutation<any, { formData: FormData }>({
      query: ({ formData }) => ({
        url: '/api/createProduct',
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['products'],
    }),
    viewSingleProduct: builder.mutation<any, { productId: any }>({
      query: ({ productId}) => ({
        url: `/api/viewProduct/${productId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['products'],
    }),
  }),
});

export const {
  useGetgetProductsQuery,
  useGetSellerProductsQuery,
  useCreateProductMutation,
  useViewSingleProductMutation
} = productsEndpoints;
