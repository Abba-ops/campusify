import React from "react";
import Container from "react-bootstrap/esm/Container";
import CarouselProducts from "./CarouselProducts";

export default function FeaturedProducts() {
  return (
    <section>
      <Container className="py-5 bg-white">
        <div className="text-center">
          <p className="text-muted mb-3">Explore Our</p>
          <h2 className="text-uppercase mb-4">Featured Products</h2>
        </div>
        <CarouselProducts lgColumnSize={3} showPreviewIcon={true} />
      </Container>
    </section>
  );
}
