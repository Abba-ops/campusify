import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
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
      invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/categories`,
        method: "GET",
      }),
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/categories`,
        method: "POST",
        body: data,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${PRODUCTS_URL}/categories/${categoryId}`,
        method: "DELETE",
      }),
    }),
    getProductsByCategory: builder.query({
      query: ({ category, categoryId }) => ({
        url: `${PRODUCTS_URL}/category/${category}/${categoryId}`,
        method: "GET",
      }),
    }),
    searchProducts: builder.query({
      query: (query) => ({
        url: `${PRODUCTS_URL}/search?query=${query}`,
        method: "GET",
      }),
    }),
    getProductsBySubcategory: builder.query({
      query: ({ subcategory, subcategoryId }) => ({
        url: `${PRODUCTS_URL}/subcategory/${subcategory}/${subcategoryId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useGetProductDetailsQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsQuery,
  useGetProductsBySubcategoryQuery,
} = productsApiSlice;
