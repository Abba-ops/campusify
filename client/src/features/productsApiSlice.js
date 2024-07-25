import { PRODUCTS_URL } from "../constants";
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
      query: ({ productId, formData }) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"],
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
    addSubcategory: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/subcategory`,
        method: "POST",
        body: data,
      }),
    }),
    deleteSubcategory: builder.mutation({
      query: ({ categoryId, subcategoryId }) => ({
        url: `${PRODUCTS_URL}/subcategory/${categoryId}/${subcategoryId}`,
        method: "DELETE",
      }),
    }),
    getIsFeatured: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/featured`,
        method: "GET",
      }),
    }),
    getPopularProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/popular`,
        method: "GET",
      }),
    }),
    getBestSellingProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/best-sellers`,
        method: "GET",
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
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
  useGetProductDetailsQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsQuery,
  useGetProductsBySubcategoryQuery,
  useAddSubcategoryMutation,
  useDeleteSubcategoryMutation,
  useGetIsFeaturedQuery,
  useGetPopularProductsQuery,
  useGetBestSellingProductsQuery,
  useDeleteProductMutation,
} = productsApiSlice;
