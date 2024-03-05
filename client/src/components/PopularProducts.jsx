import React from "react";
import Container from "react-bootstrap/esm/Container";
import CarouselProducts from "./CarouselProducts";

export default function PopularProducts() {
  return (
    <section className="py-5">
      <div className="text-center">
        <p className="text-muted mb-3">Discover Our</p>
        <h2 className="text-uppercase mb-4">Popular Products</h2>
      </div>
      <CarouselProducts lgColumnSize={3} showPreviewIcon={true} />
    </section>
  );
}
