import { TASKS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const vendorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (data) => ({
        url: TASKS_URL,
        method: "POST",
        body: data,
      }),
    }),
    getTasksByRoleAndUser: builder.query({
      query: (role) => ({
        url: `${TASKS_URL}/${role}`,
        method: "GET",
      }),
    }),
    updateTask: builder.mutation({
      query: (updatedTask) => ({
        url: `${TASKS_URL}/${updatedTask._id}`,
        method: "PUT",
        body: updatedTask,
      }),
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTasksByRoleAndUserQuery,
  useUpdateTaskMutation,
} = vendorApiSlice;
