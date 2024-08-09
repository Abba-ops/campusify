import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetNewProductsQuery } from "../features/productsApiSlice";
import { Button, Col, Container, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import SingleProductPlaceholder from "../components/SingleProductPlaceholder";
import BackToTop from "../components/BackToTop";
import MetaTags from "../components/MetaTags";

export default function NewProductsPage() {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const { data: newProducts, isError, isLoading } = useGetNewProductsQuery();
  let sortedProducts = [];
  if (newProducts && newProducts.data) {
    sortedProducts = [...newProducts.data].sort(
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
        title="New Products - Campusify"
        description="Discover the latest products in our store. Stay updated with the newest arrivals."
        keywords="new products, latest items, new arrivals, Campusify"
      />
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h4 className="mb-3 text-center">Discover Our Latest Arrivals</h4>
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
                  Currently, there are no new products available. Please check
                  back later.
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
