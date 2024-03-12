import { VENDORS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const vendorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVendors: builder.query({
      query: () => ({
        url: `${VENDORS_URL}`,
        method: "get",
      }),
    }),
    getVendorById: builder.query({
      query: (vendorId) => ({
        url: `${VENDORS_URL}/${vendorId}`,
        method: "get",
      }),
    }),
    getVendorProducts: builder.query({
      query: () => ({
        url: `${VENDORS_URL}/products`,
        method: "get",
      }),
    }),
    vendorApplication: builder.mutation({
      query: (data) => ({
        url: `${VENDORS_URL}/application`,
        method: "POST",
        body: data,
      }),
    }),
    rejectVendor: builder.mutation({
      query: (vendorId) => ({
        url: `${VENDORS_URL}/reject/${vendorId}`,
        method: "PUT",
      }),
    }),
    approveVendor: builder.mutation({
      query: (vendorId) => ({
        url: `${VENDORS_URL}/approve/${vendorId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetVendorsQuery,
  useGetVendorProductsQuery,
  useVendorApplicationMutation,
  useGetVendorByIdQuery,
  useApproveVendorMutation,
  useRejectVendorMutation,
} = vendorApiSlice;
