import React from "react";
import CarouselProducts from "./CarouselProducts";
import { useGetIsFeaturedQuery } from "../features/productsApiSlice";

export default function FeaturedProducts() {
  const {
    data: featuredProducts,
    isError,
    isLoading,
  } = useGetIsFeaturedQuery();

  return (
    <section className="py-5">
      <div className="text-center">
        <p className="text-muted mb-3">Featured Collection</p>
        <h2 className="text-uppercase mb-4">Featured Products</h2>
      </div>

      <CarouselProducts
        lgColumnSize={3}
        showPreviewIcon={true}
        isError={isError}
        isLoading={isLoading}
        productsData={featuredProducts && featuredProducts.data}
      />
    </section>
  );
}
