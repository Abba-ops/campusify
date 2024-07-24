import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import CarouselProducts from "./CarouselProducts";
import { useGetIsFeaturedQuery } from "../features/productsApiSlice";
import { Button } from "react-bootstrap";

export default function FeaturedProducts() {
  const {
    data: featuredProducts,
    isError,
    isLoading,
  } = useGetIsFeaturedQuery();

  const hasProducts =
    featuredProducts &&
    featuredProducts?.data &&
    featuredProducts?.data?.length > 0;

  return (
    <section className="py-5">
      <div className="text-center mb-4 position-relative">
        <p className="text-muted mb-3">Featured Collection</p>
        <h2>Featured Products</h2>
        {hasProducts && (
          <div
            className="d-none d-md-flex position-absolute"
            style={{
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              whiteSpace: "nowrap",
            }}>
            <Link
              to="/featured"
              className="d-flex align-items-center text-decoration-none">
              Explore More <FaChevronRight className="mx-2" />
            </Link>
          </div>
        )}
      </div>

      <CarouselProducts
        lgColumnSize={4}
        showPreviewIcon={true}
        productsData={featuredProducts?.data}
        isLoading={isLoading}
        isError={isError}
        noProductsMessage="Currently, there are no featured products available. Please check back later."
      />

      {hasProducts && (
        <div className="text-center mt-4 d-block d-md-none">
          <Button as={Link} size="sm" to="/featured" className="text-white">
            Explore More <FaChevronRight className="ml-2" />
          </Button>
        </div>
      )}
    </section>
  );
}
