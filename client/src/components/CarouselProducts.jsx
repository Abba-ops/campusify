import React from "react";
import { Container, Col, Row, Placeholder } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "../features/productsApiSlice";

export default function CarouselProducts({
  lgColumnSize = 12,
  showPreviewIcon,
}) {
  const { data: productsData, isLoading, error } = useGetProductsQuery();

  const renderSinglePlaceholder = () => (
    <Col lg={lgColumnSize} md={6}>
      <Placeholder as="div" animation="glow" className="placeholder-glow">
        <span className="placeholder col-12" style={{ height: "250px" }}></span>
        <span
          className="placeholder col-12 mt-2"
          style={{ height: "20px" }}></span>
        <span
          className="placeholder col-10 mt-2"
          style={{ height: "10px" }}></span>
        <span
          className="placeholder col-12 mt-2"
          style={{ height: "20px" }}></span>
        <span
          className="placeholder col-8 mt-2"
          style={{ height: "10px" }}></span>
        <span
          className="placeholder col-10 mt-2"
          style={{ height: "15px" }}></span>
      </Placeholder>
    </Col>
  );

  return (
    <Container className="pt-4">
      {!error ? (
        <Row className="overflow-x-scroll overflow-y-hidden flex-nowrap products-slider">
          {!isLoading
            ? productsData.data.map((product, index) => (
                <Col lg={lgColumnSize} key={index} md={6}>
                  <ProductCard
                    product={product}
                    showPreviewIcon={showPreviewIcon}
                  />
                </Col>
              ))
            : Array.from({ length: 4 }, (_, index) => (
                <React.Fragment key={index}>
                  {renderSinglePlaceholder()}
                </React.Fragment>
              ))}
        </Row>
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
