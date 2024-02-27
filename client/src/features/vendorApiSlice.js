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
    getVendorProducts: builder.query({
      query: () => ({
        url: `${VENDORS_URL}/products`,
        method: "get",
      }),
    }),
  }),
});

export const { useGetVendorsQuery, useGetVendorProductsQuery } = vendorApiSlice;
