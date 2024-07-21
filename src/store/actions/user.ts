import baseAPI from "../api";

const token = window.localStorage.getItem('token');

const authEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    updatePassword: builder.mutation<any, { id: string; oldPassword: string; newPassword: string }>({
      query: ({ id, oldPassword, newPassword }) => ({
        url: `/api/users/${id}/updatepassword`,
        method: "PATCH",
        body: { oldPassword, newPassword },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    fetchUsers: builder.query<any, void>({
      query: () => ({
        url: '/api/users/users',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateUserStatus: builder.mutation<any, { id: string; activationReason: string }>({
      query: ({ id, activationReason }) => ({
        url: `/api/users/change-account-status/${id}`,
        method: "PATCH",
        body: { activationReason },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useUpdatePasswordMutation, useUpdateUserStatusMutation,useFetchUsersQuery } = authEndpoints;
