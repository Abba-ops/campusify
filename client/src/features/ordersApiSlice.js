import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query: (data) => ({
        url: ORDERS_URL,
        method: "POST",
        body: data,
      }),
    }),
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
        method: "GET",
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
        method: "GET",
      }),
    }),
    getVendorOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/orders/vendor`,
        method: "GET",
      }),
    }),
    getVendorOrder: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/vendor`,
        method: "GET",
      }),
    }),
    markOrderAsDelivered: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/vendor`,
        method: "PUT",
      }),
    }),
    markOrderAsReceived: builder.mutation({
      query: ({ orderId, itemId }) => ({
        url: `${ORDERS_URL}/${orderId}/items/${itemId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetOrderByIdQuery,
  useCreateNewOrderMutation,
  useGetOrdersQuery,
  useGetMyOrdersQuery,
  useGetVendorOrderQuery,
  useGetVendorOrdersQuery,
  useMarkOrderAsDeliveredMutation,
  useMarkOrderAsReceivedMutation,
} = ordersApiSlice;
