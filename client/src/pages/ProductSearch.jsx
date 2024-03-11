import React from "react";
import { useSearchProductsQuery } from "../features/productsApiSlice";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import SingleProductPlaceholder from "../components/SingleProductPlaceholder";

export default function ProductSearch() {
  const { query } = useParams();
  const { data: products, isLoading, isError } = useSearchProductsQuery(query);

  return (
    <Container className="mt-5">
      {isError ? (
        <div className="text-center mt-5">
          <h4 className="text-danger">Error Fetching Products</h4>
          <p className="mt-3">
            Sorry, we couldn't retrieve the products at the moment. Please try
            again later or contact support.
          </p>
        </div>
      ) : (
        <Row className="overflow-x-scroll overflow-y-hidden flex-nowrap products-slider">
          {isLoading ? (
            Array.from({ length: 4 }, (_, index) => (
              <React.Fragment key={index}>
                <SingleProductPlaceholder lgColumnSize={3} />
              </React.Fragment>
            ))
          ) : (
            <>
              {products.data.map((product) => (
                <Col key={product.id} md={4} lg={3} className="mb-3">
                  <ProductCard product={product} />
                </Col>
              ))}
            </>
          )}
        </Row>
      )}
    </Container>
  );
}
