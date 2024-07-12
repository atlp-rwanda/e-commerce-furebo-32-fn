import baseAPI from "../api";

const getAuthToken = () => {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYnV5ZXIiLCJlbWFpbCI6Im11Z0BnbWFpbC5jb20iLCJpZCI6IjY4MWI0OGUzLWFkMjItNDVlNS1hZmMxLWVlZmVkZDI0M2U2OCIsImZpcnN0TmFtZSI6Ik11Z2lzaGEiLCJpYXQiOjE3MjA0MzA2NTQsImV4cCI6MTcyMDQzNDI1NH0.fIDaEP69jdb-20BPUEtYMoOK_mXcs7FayJ6VYJqK2xU";
};

const productsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getgetProducts: builder.query<any, { params?: any }>({
      query: ({ params }) => ({
        url: "/availableItems",
        method: "GET",
        params,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    }),
    
  }),
});

export const { useGetgetProductsQuery } = productsEndpoints;