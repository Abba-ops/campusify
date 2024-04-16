import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    authUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: "POST",
        body: data,
      }),
    }),
    getUserProfile: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/profile/${userId}`,
        method: "GET",
      }),
    }),
    updateUserPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update-password`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteMyAccount: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/delete-account`,
        method: "DELETE",
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
      }),
    }),
    getUserById: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAuthUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useUpdateUserPasswordMutation,
  useDeleteMyAccountMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useGetUserProfileQuery,
} = usersApiSlice;
