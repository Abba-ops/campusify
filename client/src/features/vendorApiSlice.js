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
  }),
});

export const {
  useGetVendorsQuery,
  useGetVendorProductsQuery,
  useVendorApplicationMutation,
  useGetVendorByIdQuery,
  useUpdateVendorStatusMutation,
  useDeleteVendorMutation,
  useUploadVendorLogoMutation
} = vendorApiSlice;
