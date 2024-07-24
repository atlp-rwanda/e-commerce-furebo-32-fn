import baseAPI from '../api';

const token = window.localStorage.getItem('token');

const notifificationsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<any, { params?: any }>({
      query: ({ params }) => ({
        url: '/api/notifications',
        method: 'GET',
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useGetNotificationsQuery } = notifificationsEndpoints;
