import React from "react";
import {
  useGetUserVendorProductQuery,
  useGetVendorProfileQuery,
} from "../features/vendorApiSlice";
import { useParams } from "react-router-dom";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import CarouselProducts from "../components/CarouselProducts";

export default function VendorScreen() {
  const { vendorId } = useParams();

  const {
    data: vendorProfile,
    isLoading: isLoadingVendorProfile,
    isError: isErrorProfile,
  } = useGetVendorProfileQuery(vendorId);

  const {
    data: vendorProducts,
    isLoading: isLoadingVendorProducts,
    isError: isErrorVendorProducts,
  } = useGetUserVendorProductQuery(vendorId);

  const renderLoadingState = (
    <div className="text-center">
      <div className="placeholder-glow">
        <span
          className="placeholder col-12 profile-picture-lg rounded-pill mb-3"
          style={{ height: "400px" }}></span>
        <div className="text-center">
          <span className="placeholder col-8 mb-2"></span>
          <span className="placeholder col-12 mb-2"></span>
          <span className="placeholder col-8 mb-2"></span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col lg={6} className="mb-6 mb-lg-0">
            <Card>
              <Card.Body>
                {isErrorProfile ? (
                  <div className="text-center mt-5">
                    <h4 className="text-danger">Error Loading User Profile</h4>
                    <p className="mt-3">
                      Failed to load user profile data. Please try again later.
                    </p>
                  </div>
                ) : isLoadingVendorProfile ? (
                  renderLoadingState
                ) : (
                  <div className="text-center">
                    <Image
                      fluid
                      roundedCircle
                      loading="lazy"
                      className="profile-picture-lg border"
                      src={vendorProfile && vendorProfile.data.vendorLogo}
                    />
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            {vendorProducts && vendorProducts.data.length === 0 ? (
              <div className="text-center">
                <h3>No products available</h3>
                <p>Sorry, there are no products available from this vendor.</p>
              </div>
            ) : (
              <>
                <h3 className="text-uppercase text-center">
                  Explore Our Products
                </h3>
                <CarouselProducts
                  lgColumnSize={6}
                  isError={isErrorVendorProducts}
                  isLoading={isLoadingVendorProducts}
                  showPreviewIcon={false}
                  productsData={vendorProducts && vendorProducts.data}
                />
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
