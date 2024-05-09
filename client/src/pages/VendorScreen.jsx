import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetUserVendorProductQuery,
  useGetVendorProfileQuery,
} from "../features/vendorApiSlice";
import { Card, Col, Container, Image, Row, Stack } from "react-bootstrap";
import CarouselProducts from "../components/CarouselProducts";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

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
    <Row>
      <Col lg={6}>
        <div className="placeholder-glow">
          <span
            className="placeholder col-12 profile-picture-lg rounded-pill mb-3"
            style={{ height: "400px" }}></span>
        </div>
      </Col>
      <Col lg={6}>
        <div className="placeholder-glow">
          {[...Array(8)].map((_, index) => (
            <span key={index} className="placeholder col-12 mb-2"></span>
          ))}
        </div>
      </Col>
    </Row>
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
                    <Row>
                      <Col lg={6}>
                        <Image
                          fluid
                          roundedCircle
                          loading="lazy"
                          alt={vendorProfile.data.vendorName}
                          className="profile-picture-lg border mb-3"
                          src={vendorProfile && vendorProfile.data.vendorLogo}
                        />
                      </Col>
                      <Col lg={6}>
                        <Card.Title>{vendorProfile.data.vendorName}</Card.Title>
                        <Card.Text>{vendorProfile.data.vendorEmail}</Card.Text>
                        <Card.Text>{vendorProfile.data.vendorPhone}</Card.Text>
                        <Card.Text>
                          {vendorProfile.data.vendorDescription}
                        </Card.Text>
                        <Card.Text>
                          {vendorProfile.data.productsDescription}
                        </Card.Text>
                        <Stack direction="horizontal" gap={3} className="mb-3">
                          <FacebookShareButton hashtag={""}>
                            <FacebookIcon size={40} round />
                          </FacebookShareButton>
                          <TwitterShareButton
                            hashtags={[]}
                            title={vendorProfile.data.productName}>
                            <XIcon size={40} round />
                          </TwitterShareButton>
                          <WhatsappShareButton separator="">
                            <WhatsappIcon size={40} round />
                          </WhatsappShareButton>
                          <EmailShareButton>
                            <EmailIcon size={40} round />
                          </EmailShareButton>
                        </Stack>
                      </Col>
                    </Row>
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
                  lgColumnSize={2}
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
