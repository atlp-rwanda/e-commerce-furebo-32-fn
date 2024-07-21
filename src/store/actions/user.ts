import baseAPI from "../api";
const getAuthToken = () => {
    return localStorage.getItem('token');
};
  
const authEndpoints = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
      updatePassword: builder.mutation<any, { id: string; oldPassword: string; newPassword: string}>({
        query: ({ id, oldPassword, newPassword }) => ({
          url: `users/${id}/updatepassword`,
          method: "PATCH",
          body: { oldPassword, newPassword },
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }),
      }),
      verify2FA: builder.mutation<any, {code: string}>({
        query: ({ code }) => ({
          url: `api/users/verify-otp`,
          method: "GET",
          body: { code },
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }),
      }),
    }),
  });


  export const { useUpdatePasswordMutation, useVerify2FAMutation } = authEndpoints;
  