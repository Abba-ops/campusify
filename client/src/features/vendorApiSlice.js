import { UPLOAD_URL, VENDORS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const vendorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVendors: builder.query({
      query: () => ({
        url: `${VENDORS_URL}`,
        method: "GET",
      }),
    }),
    getVendorById: builder.query({
      query: (vendorId) => ({
        url: `${VENDORS_URL}/${vendorId}`,
        method: "GET",
      }),
    }),
    getVendorProducts: builder.query({
      query: () => ({
        url: `${VENDORS_URL}/products`,
        method: "GET",
      }),
    }),
    vendorApplication: builder.mutation({
      query: (data) => ({
        url: `${VENDORS_URL}/application`,
        method: "POST",
        body: data,
      }),
    }),
    updateVendorStatus: builder.mutation({
      query: ({ vendorId, status }) => ({
        url: `${VENDORS_URL}/${vendorId}/${status}`,
        method: "PUT",
      }),
    }),
    deleteVendor: builder.mutation({
      query: (vendorId) => ({
        url: `${VENDORS_URL}/${vendorId}`,
        method: "DELETE",
      }),
    }),
    uploadVendorLogo: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}/logos`,
        method: "POST",
        body: data,
      }),
    }),
    getProductsByVendor: builder.query({
      query: (vendorId) => ({
        url: `${VENDORS_URL}/${vendorId}/products`,
        method: "GET",
      }),
    }),
    getVendorCustomers: builder.query({
      query: () => ({
        url: `${VENDORS_URL}/customers`,
        method: "GET",
      }),
    }),
    getAllVendorCustomers: builder.query({
      query: () => ({
        url: `${VENDORS_URL}/customers/all`,
        method: "GET",
      }),
    }),
    getVendorsBySaleCount: builder.query({
      query: () => ({
        url: `${VENDORS_URL}/sales/count`,
        method: "GET",
      }),
    }),
    getVendorNotifications: builder.query({
      query: () => ({
        url: `${VENDORS_URL}/notifications`,
        method: "GET",
      }),
    }),
    markNotificationAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `${VENDORS_URL}/notifications/${notificationId}/mark-as-read`,
        method: "PUT",
      }),
    }),
    deleteNotification: builder.mutation({
      query: (notificationId) => ({
        url: `${VENDORS_URL}/notifications/${notificationId}`,
        method: "DELETE",
      }),
    }),
    getVendorProfile: builder.query({
      query: (vendorId) => ({
        url: `${VENDORS_URL}/profile/${vendorId}`,
        method: "GET",
      }),
    }),
    getUserVendorProduct: builder.query({
      query: (vendorId) => ({
        url: `${VENDORS_URL}/profile/products/${vendorId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetVendorsQuery,
  useGetVendorProductsQuery,
  useVendorApplicationMutation,
  useGetVendorByIdQuery,
  useUpdateVendorStatusMutation,
  useDeleteVendorMutation,
  useUploadVendorLogoMutation,
  useGetProductsByVendorQuery,
  useGetVendorCustomersQuery,
  useGetAllVendorCustomersQuery,
  useGetVendorsBySaleCountQuery,
  useGetVendorNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useDeleteNotificationMutation,
  useGetVendorProfileQuery,
  useGetUserVendorProductQuery,
} = vendorApiSlice;
