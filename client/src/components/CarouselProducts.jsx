import React from "react";
import { Container, Col, Row, Badge } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import ProductCard from "./ProductCard";
import SingleProductPlaceholder from "./SingleProductPlaceholder";

export default function CarouselProducts({
  lgColumnSize = 12,
  showPreviewIcon,
  productsData,
  isLoading,
  isError,
}) {
  return (
    <Container className="pt-4">
      {!isError ? (
        <div>
          <Row className="overflow-x-scroll overflow-y-hidden flex-nowrap products-slider">
            {!isLoading
              ? productsData?.map((product, index) => (
                  <Col lg={lgColumnSize} key={index} md={6}>
                    <ProductCard
                      product={product}
                      showPreviewIcon={showPreviewIcon}
                    />
                  </Col>
                ))
              : Array.from({ length: 4 }, (_, index) => (
                  <Col lg={lgColumnSize} md={6} key={index}>
                    <SingleProductPlaceholder />
                  </Col>
                ))}
          </Row>
          <div className="scroll-indicator text-center mt-3">
            <BsArrowRight className="scroll-icon" />
            <span className="scroll-text">
              Swipe or scroll <Badge variant="secondary">right</Badge> to see
              more
            </span>
          </div>
        </div>
      ) : (
        <div className="text-center mt-5">
          <h4 className="text-danger">Error Fetching Products</h4>
          <p className="mt-3">
            Sorry, we couldn't retrieve the products at the moment. Please try
            again later or contact support.
          </p>
        </div>
      )}
    </Container>
  );
}
