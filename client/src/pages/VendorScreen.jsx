import React from "react";
import {
  useGetUserVendorProductQuery,
  useGetVendorProfileQuery,
} from "../features/vendorApiSlice";
import { Link, useParams } from "react-router-dom";
import { Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
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
                    <h4 className="text-danger">Failed to Load User Profile</h4>
                    <p className="mt-3">
                      We're sorry, but we encountered an issue while loading the
                      user profile. Please try again later.
                    </p>
                  </div>
                ) : isLoadingVendorProfile ? (
                  renderLoadingState
                ) : (
                  <>
                    <div className="text-center">
                      <Image
                        fluid
                        roundedCircle
                        loading="lazy"
                        className="profile-picture-lg border"
                        src={vendorProfile && vendorProfile.data.vendorLogo}
                      />
                    </div>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Vendor Name:</strong>{" "}
                        {vendorProfile.data.vendorName}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Email:</strong>{" "}
                        <Link
                          className="text-decoration-none"
                          to={`mailto:${vendorProfile.data.vendorEmail}`}>
                          {vendorProfile.data.vendorEmail}
                        </Link>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Phone:</strong> {vendorProfile.data.vendorPhone}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Sales Count:</strong>{" "}
                        {vendorProfile.data.salesCount}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Approval Status:</strong>{" "}
                        {vendorProfile.data.approvalStatus}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Date Joined:</strong>{" "}
                        {vendorProfile.data.dateJoined}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Estimated Delivery Time:</strong>{" "}
                        {vendorProfile.data.estimatedDeliveryTime}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Vendor Description:</strong>{" "}
                        {vendorProfile.data.vendorDescription}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Products Description:</strong>{" "}
                        {vendorProfile.data.productsDescription}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Is Approved:</strong>{" "}
                        {vendorProfile.data.isApproved ? "Yes" : "No"}
                      </ListGroup.Item>
                    </ListGroup>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            {vendorProducts && vendorProducts.data.length === 0 ? (
              <div className="text-center">
                <h3>No products available</h3>
                <p>
                  Apologies, but it seems there are currently no products
                  offered by this vendor.
                </p>
              </div>
            ) : (
              <>
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
