import React from "react";
import CarouselProducts from "./CarouselProducts";
import { useGetPopularProductsQuery } from "../features/productsApiSlice";

export default function PopularProducts() {
  const {
    data: popularProducts,
    isError,
    isLoading,
  } = useGetPopularProductsQuery();

  return (
    <section className="py-5">
      <div className="text-center">
        <p className="text-muted mb-3">Top Rated Selection</p>
        <h2 className="text-uppercase mb-4">Popular Products</h2>
      </div>
      <CarouselProducts
        lgColumnSize={4}
        showPreviewIcon={true}
        isError={isError}
        isLoading={isLoading}
        productsData={popularProducts && popularProducts?.data}
      />
    </section>
  );
}
