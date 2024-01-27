import React from "react";
import Container from "react-bootstrap/esm/Container";
import ProductsSlider from "./ProductsSlider";

export default function PopularProducts() {
  return (
    <Container className="bg-white py-5">
      <section>
        <div className="text-center">
          <p className="text-muted">Lorem ipsum dolor sit.</p>
          <h2 className="text-uppercase text-body-emphasis">
            Popular Products
          </h2>
        </div>
        <ProductsSlider lg={3} showIcon={true} />
      </section>
    </Container>
  );
}
