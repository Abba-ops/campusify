import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    createReview: builder.mutation({
      query: ({ productId, rating, comment, userId, name }) => ({
        url: `${PRODUCTS_URL}/${productId}/reviews`,
        method: "POST",
        body: { rating, comment, userId, name },
      }),
    }),
    deleteReview: builder.mutation({
      query: ({ reviewId, productId }) => ({
        url: `${PRODUCTS_URL}/${productId}/reviews/${reviewId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
} = productsApiSlice;
