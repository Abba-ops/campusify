import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetIsFeaturedQuery } from "../features/productsApiSlice";
import { Button, Col, Container, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import SingleProductPlaceholder from "../components/SingleProductPlaceholder";
import BackToTop from "../components/BackToTop";
import MetaTags from "../components/MetaTags";

export default function FeaturedProductsPage() {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const {
    data: featuredProducts,
    isError,
    isLoading,
  } = useGetIsFeaturedQuery();

  let sortedProducts = [];
  if (featuredProducts && featuredProducts.data) {
    sortedProducts = [...featuredProducts.data].sort(
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
        title="Explore Featured Products - Campusify"
        description="Discover our curated collection of featured products. Explore high-quality items that showcase the best of what Campusify offers."
        keywords="featured products, curated collection, best products, top picks, Campusify"
      />
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h4 className="mb-3 text-center">Highlighted Products</h4>
          </Col>
        </Row>
        {isError ? (
          <div className="text-center mt-5">
            <h5 className="text-danger">Error Fetching Products</h5>
            <p className="mt-3">
              We apologize, but we couldn't fetch the products at the moment.
              Please try again later.
            </p>
          </div>
        ) : (
          <>
            {sortedProducts.length === 0 && !isLoading && !isError ? (
              <div className="text-center mt-5">
                <h5>No Products Available</h5>
                <p className="mt-3">
                  Currently, there are no featured products available. Please
                  check back later.
                </p>
                <Button
                  to="/"
                  as={Link}
                  variant="primary"
                  className="px-4 mt-3 text-white">
                  Go to Home
                </Button>
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
                            className="mt-4 px-4">
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
      <BackToTop />
    </>
  );
}
