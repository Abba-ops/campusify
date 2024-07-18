import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import CarouselProducts from "./CarouselProducts";
import { useGetPopularProductsQuery } from "../features/productsApiSlice";
import { Button } from "react-bootstrap";

export default function PopularProducts() {
  const {
    data: popularProducts,
    isError,
    isLoading,
  } = useGetPopularProductsQuery();

  return (
    <section className="py-5">
      <div className="text-center mb-4 position-relative">
        <p className="text-muted mb-3">Top Rated Selection</p>
        <h2>Popular Products</h2>
        <div
          className="d-none d-md-flex position-absolute"
          style={{
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            whiteSpace: "nowrap",
          }}>
          <Link
            to="/popular"
            className="d-flex align-items-center text-decoration-none">
            Explore More <FaChevronRight className="mx-2" />
          </Link>
        </div>
      </div>

      <CarouselProducts
        lgColumnSize={4}
        showPreviewIcon={true}
        isError={isError}
        isLoading={isLoading}
        productsData={popularProducts && popularProducts?.data}
      />

      <div className="text-center mt-4 d-block d-md-none">
        <Button as={Link} size="sm" to="/popular" className="text-white">
          Explore More <FaChevronRight className="ml-2" />
        </Button>
      </div>
    </section>
  );
}
