import React, { useEffect } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetUserProfileQuery } from "../features/usersApiSlice";
import MetaTags from "../components/MetaTags";

export default function UserProfile() {
  const { userId } = useParams();
  const {
    data: userProfile,
    isLoading,
    isError,
  } = useGetUserProfileQuery(userId);

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
    <div className="text-center">
      <Image
        fluid
        roundedCircle
        loading="lazy"
        className="profile-picture-lg border"
        src={userProfile && userProfile.data.profilePictureURL}
        alt={`${userProfile && userProfile.data.lastName}'s Profile`}
      />
      <h2 className="mt-3">{`${userProfile && userProfile.data.otherNames} ${
        userProfile && userProfile.data.lastName
      }`}</h2>
      <Link
        to={`mailto:${userProfile && userProfile.data.email}`}
        className="text-decoration-none">
        {userProfile && userProfile.data.email}
      </Link>
    </div>
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <Col lg={8}>
            <Card>
              <Card.Body>
                {isError ? (
                  <div className="text-danger text-center">
                    Error loading user profile. Please try again later.
                  </div>
                ) : isLoading ? (
                  renderLoadingState
                ) : (
                  renderUserProfile
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
