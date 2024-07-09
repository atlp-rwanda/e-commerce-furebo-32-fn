import baseAPI from "../api";

const getAuthToken = () => {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYnV5ZXIiLCJlbWFpbCI6Im11Z0BnbWFpbC5jb20iLCJpZCI6IjY4MWI0OGUzLWFkMjItNDVlNS1hZmMxLWVlZmVkZDI0M2U2OCIsImZpcnN0TmFtZSI6Ik11Z2lzaGEiLCJpYXQiOjE3MjA0MzA2NTQsImV4cCI6MTcyMDQzNDI1NH0.fIDaEP69jdb-20BPUEtYMoOK_mXcs7FayJ6VYJqK2xU";
};

const authEndpoints = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
      updatePassword: builder.mutation<any, { id: string; oldPassword: string; newPassword: string }>({
        query: ({ id, oldPassword, newPassword }) => ({
          url: `/${id}/updatepassword`,
          method: "PATCH",
          body: { oldPassword, newPassword },
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }),
      }),
    }),
  });

  export const { useUpdatePasswordMutation } = authEndpoints;
  