import React from "react";
import { Badge, Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import { useGetVendorsBySaleCountQuery } from "../features/vendorApiSlice";
import { BsArrowRight } from "react-icons/bs";

export default function VendorCarousel() {
  const { data: vendors, isError, isLoading } = useGetVendorsBySaleCountQuery();

  const VendorPlaceholder = () => (
    <div className="placeholder-glow">
      <span
        className="placeholder col-12 mt-2"
        style={{ height: "20px" }}></span>
      <span
        className="placeholder col-8 mt-2"
        style={{ height: "10px" }}></span>
      <span
        className="placeholder col-10 mt-2"
        style={{ height: "15px" }}></span>
    </div>
  );

  const renderVendorCard = (vendor) => (
    <Col lg={3} md={6} key={vendor._id}>
      <Card className="rounded-0">
        <Card.Body>
          <Row>
            <Col xs={4}>
              <Image
                fluid
                roundedCircle
                src={vendor.vendorLogo}
                style={{
                  objectFit: "cover",
                  objectPosition: "top",
                  width: "60px",
                  height: "60px",
                }}
              />
            </Col>
            <Col xs={8}>
              <Card.Title className="text-truncate text-capitalize">
                <Link
                  className="text-decoration-none"
                  to={`/vendor/${vendor._id}`}>
                  {vendor.vendorName}
                </Link>
              </Card.Title>
              <div className="text-muted text-truncate mb-2">
                {vendor.productsDescription}
              </div>
              <StarRating value={vendor.averageRating} size={16} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );

  const renderLoadingPlaceholders = () =>
    Array.from({ length: 4 }, (_, index) => (
      <Col lg={3} md={6} key={index}>
        <VendorPlaceholder />
      </Col>
    ));

  return (
    <section className="py-5">
      <div className="text-center">
        <p className="text-muted mb-3">Featured Vendors</p>
        <h2 className="text-uppercase mb-4">Explore Our Vendors</h2>
      </div>
      <Container className="pt-4">
        {!isError ? (
          <div>
            <Row className="overflow-x-scroll overflow-y-hidden flex-nowrap products-slider">
              {!isLoading
                ? vendors.data.map(renderVendorCard)
                : renderLoadingPlaceholders()}
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
            <h4 className="text-danger">Error Fetching Vendors</h4>
            <p className="mt-3">
              Sorry, we couldn't retrieve the vendors at the moment. Please try
              again later or contact support.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
