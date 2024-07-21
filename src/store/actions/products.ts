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
    getSingleProduct: builder.query<any, { params?: any; product_id: string }>({
      query: ({ params, product_id }) => ({
        url: `/api/viewProduct/${product_id}`,
        method: 'GET',
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    updateProduct: builder.mutation<any, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/api/updateProduct/${id}`,
        method: 'PATCH',
        body: formData,
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
  useUpdateProductMutation,
  useGetSingleProductQuery,
} = productsEndpoints;
