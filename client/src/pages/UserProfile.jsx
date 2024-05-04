import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetUserProfileQuery } from "../features/usersApiSlice";
import MetaTags from "../components/MetaTags";
import CarouselProducts from "../components/CarouselProducts";

export default function UserProfile() {
  const { userId } = useParams();

  const {
    data: userProfile,
    isLoading: isLoadingUserProfile,
    isError: isErrorUserProfile,
  } = useGetUserProfileQuery(userId);

  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isErrorProducts, setIsErrorProducts] = useState(false);

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

  const renderUserProfile = (
    <div
      className={`${
        userProfile && userProfile.data.isVendor
          ? "text-center text-lg-start"
          : "text-center"
      }`}>
      <div className="text-center">
        <Image
          fluid
          roundedCircle
          loading="lazy"
          className="profile-picture-lg border"
          src={userProfile && userProfile.data.profilePictureURL}
          alt={`${userProfile && userProfile.data.lastName}'s Profile`}
        />
      </div>
      <h4 className="mt-3">
        {`${userProfile && userProfile.data.otherNames} ${
          userProfile && userProfile.data.lastName
        }`}
      </h4>
      <p>
        <Link
          to={`mailto:${userProfile && userProfile.data.email}`}
          className="text-decoration-none">
          {userProfile && userProfile.data.email}
        </Link>
      </p>
      {userProfile && userProfile.data.isVendor && (
        <div className="mt-4">
          <h5 className="mb-3">Vendor Information</h5>
          <p>
            <strong>Vendor Name:</strong> {userProfile.data.vendor.vendorName}
          </p>
          <p>
            <strong>Vendor Email:</strong> {userProfile.data.vendor.vendorEmail}
          </p>
          <p>
            <strong>Vendor Phone:</strong> {userProfile.data.vendor.vendorPhone}
          </p>
          <p>
            <strong>Sales Count:</strong> {userProfile.data.vendor.salesCount}
          </p>
          <p>
            <strong>Approval Status:</strong>{" "}
            {userProfile.data.vendor.approvalStatus}
          </p>
        </div>
      )}
    </div>
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          `/api/vendors/profile/products/${
            userProfile && userProfile?.data.vendor._id
          }`
        );
        const data = await res.json();

        if (data.success) {
          setIsLoadingProducts(false);
          setProducts(data?.data);
        } else {
          setIsErrorProducts(true);
        }
      } catch (error) {
        setIsErrorProducts(true);
      }
    };
    if (!isLoadingUserProfile && userProfile && userProfile.data.isVendor) {
      getProducts();
    }
  }, [isLoadingUserProfile, userProfile]);

  return (
    <section className="py-5">
      {userProfile && userProfile.data && (
        <MetaTags
          title={`${userProfile.data.otherNames || ""} ${
            userProfile.data.lastName || ""
          } - Profile`}
          description="View user profile on Campusify"
          keywords="Campusify, user profile"
        />
      )}
      <Container>
        <Row className="justify-content-center">
          <Col
            lg={userProfile && userProfile.data.isVendor ? 3 : 8}
            className={`${userProfile?.data.isVendor && "mb-6 mb-lg-0"}`}>
            <Card>
              <Card.Body>
                {isErrorUserProfile ? (
                  <div className="text-center mt-5">
                    <h4 className="text-danger">Error Loading User Profile</h4>
                    <p className="mt-3">
                      Failed to load user profile. Please try again later.
                    </p>
                  </div>
                ) : isLoadingUserProfile ? (
                  renderLoadingState
                ) : (
                  renderUserProfile
                )}
              </Card.Body>
            </Card>
          </Col>
          {userProfile && userProfile.data.isVendor && (
            <Col lg={9}>
              {products.length === 0 ? (
                <div className="text-center">
                  <h3>No products available</h3>
                  <p>
                    Sorry, there are no products available from this vendor.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-uppercase text-center">
                    Explore Vendor Products
                  </h3>
                  <CarouselProducts
                    lgColumnSize={4}
                    isError={isErrorProducts}
                    isLoading={isLoadingProducts}
                    showPreviewIcon={false}
                    productsData={products && products}
                  />
                </>
              )}
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
}
