import baseAPI from "../api";

const token = window.localStorage.getItem('token');

const authEndpoints = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
      updatePassword: builder.mutation<any, { id: string; oldPassword: string; newPassword: string}>({
        query: ({ id, oldPassword, newPassword }) => ({
          url: `/api/users/${id}/updatepassword`,
          method: "PATCH",
          body: { oldPassword, newPassword },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      }),
    }),
  });


  export const { useUpdatePasswordMutation } = authEndpoints;
  