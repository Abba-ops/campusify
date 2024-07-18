import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import CarouselProducts from "./CarouselProducts";
import { useGetBestSellingProductsQuery } from "../features/productsApiSlice";
import { Button, Placeholder } from "react-bootstrap";

export default function BestSeller() {
  const {
    data: bestSellingProducts,
    isError,
    isLoading,
  } = useGetBestSellingProductsQuery();

  return (
    <section className="py-5">
      <Row className="align-items-center">
        <Col lg={6} className="mb-5 mb-lg-0">
          <div className="text-center">
            <p className="text-muted mb-3">Best Selling Collection</p>
            <h2 className="mb-4">Best Sellers</h2>
          </div>
          <CarouselProducts
            lgColumnSize={2}
            isError={isError}
            isLoading={isLoading}
            showPreviewIcon={true}
            productsData={bestSellingProducts && bestSellingProducts?.data}
          />
          <div className="text-center mt-4">
            <Button
              as={Link}
              size="sm"
              to="/best-sellers"
              className="text-white">
              Explore More <FaChevronRight className="ml-2" />
            </Button>
          </div>
        </Col>
        <Col lg={6}>
          {isLoading ? (
            <Placeholder
              as="div"
              animation="glow"
              className="placeholder-glow image-container">
              <img
                loading="lazy"
                alt="placeholder"
                className="product-image placeholder col-12"
              />
            </Placeholder>
          ) : (
            <Carousel indicators={false} controls={false}>
              {bestSellingProducts &&
                bestSellingProducts?.data?.slice(0, 3).map((item) => (
                  <Carousel.Item key={item?._id}>
                    <div className="image-container">
                      <Image
                        fluid
                        loading="lazy"
                        src={item?.imageUrl}
                        className="product-image"
                      />
                    </div>
                  </Carousel.Item>
                ))}
            </Carousel>
          )}
        </Col>
      </Row>
    </section>
  );
}
