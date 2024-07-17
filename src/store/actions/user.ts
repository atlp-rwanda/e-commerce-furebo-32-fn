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
    }),
  });


  export const { useUpdatePasswordMutation } = authEndpoints;
  