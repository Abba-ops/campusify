import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
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
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: PRODUCTS_URL,
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "post",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useCreateProductMutation,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation
} = productsApiSlice;
