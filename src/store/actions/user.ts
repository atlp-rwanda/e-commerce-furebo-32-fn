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
      verify2FA: builder.mutation<any, {code: string, email: string}>({
        query: ({ code, email }) => ({
          url: `api/users/verify-otp`,
          method: "POST",
          body: JSON.stringify({ otp: code, email }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }),
      }),
    fetchUsers: builder.query<any, void>({
      query: () => ({
        url: '/api/users/users',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    }),
    updateUserStatus: builder.mutation<any, { id: string; activationReason: string }>({
      query: ({ id, activationReason }) => ({
        url: `/api/users/change-account-status/${id}`,
        method: "PATCH",
        body: { activationReason },
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
    }),
  }),
});

export const { useUpdatePasswordMutation, useUpdateUserStatusMutation,useFetchUsersQuery, useVerify2FAMutation } = authEndpoints;
  
