import React, { useEffect, useState } from "react";
import { useSearchProductsQuery } from "../features/productsApiSlice";
import { useParams, Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import SingleProductPlaceholder from "../components/SingleProductPlaceholder";
import MetaTags from "../components/MetaTags";

export default function ProductSearch() {
  const { query } = useParams();
  const [visibleProducts, setVisibleProducts] = useState(8);
  const { data: products, isLoading, isError } = useSearchProductsQuery(query);

  let sortedProducts = [];
  if (products && products.data) {
    sortedProducts = [...products.data].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  const handleLoadMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 8);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <MetaTags
        title={`Search Results for "${query}" - Campusify`}
        description={`Showing search results for "${query}". Explore products related to your search on Campusify.`}
        keywords={`${query}, search results, products, Campusify`}
      />
      <Container className="my-5">
        <Row className="mb-4">
          <Col>
            <h3 className="mb-3 text-center">
              <span className="text-uppercase">Search Results for</span> "
              {query}"
            </h3>
          </Col>
        </Row>
        {isError ? (
          <div className="text-center mt-5">
            <h3 className="text-danger">Error Fetching Products</h3>
            <p className="mt-3">
              We apologize, but we couldn't fetch the products at the moment.
              Please try again later.
            </p>
          </div>
        ) : (
          <>
            {sortedProducts.length === 0 && !isLoading && !isError ? (
              <div className="text-center mt-5">
                <h3>Oops! No products found.</h3>
                <p>
                  It seems we couldn't find any products matching your search
                  criteria.
                </p>
                <p>Please try adjusting your search terms or</p>
                <Link to="/">
                  <Button variant="primary">Go to Home</Button>
                </Link>
              </div>
            ) : (
              <Row>
                {isLoading ? (
                  Array.from({ length: visibleProducts }, (_, index) => (
                    <Col key={index} lg={3} md={6} className="mb-4">
                      <SingleProductPlaceholder />
                    </Col>
                  ))
                ) : (
                  <>
                    {sortedProducts
                      .slice(0, visibleProducts)
                      .map((product, index) => (
                        <Col key={index} md={4} lg={3} className="mb-4">
                          <ProductCard product={product} />
                        </Col>
                      ))}
                    {!isLoading &&
                      visibleProducts <
                        (sortedProducts ? sortedProducts.length : 0) && (
                        <Col className="d-flex justify-content-center">
                          <Button
                            variant="dark"
                            onClick={handleLoadMore}
                            className="text-uppercase mt-4">
                            Load More
                          </Button>
                        </Col>
                      )}
                  </>
                )}
              </Row>
            )}
          </>
        )}
      </Container>
    </>
  );
}
