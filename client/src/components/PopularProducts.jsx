import React from "react";
import Container from "react-bootstrap/esm/Container";
import CarouselProducts from "./CarouselProducts";

export default function PopularProducts() {
  return (
    <section>
      <Container className="py-5 bg-white">
        <div className="text-center mb-4">
          <p className="text-muted mb-3">Discover Our</p>
          <h2 className="text-uppercase mb-4">Popular Products</h2>
        </div>
        <CarouselProducts lg={3} showPreviewIcon={true} />
      </Container>
    </section>
  );
}
