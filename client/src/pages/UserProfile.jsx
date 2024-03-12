import React, { useEffect } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useUserProfileQuery } from "../features/usersApiSlice";

export default function UserProfile() {
  const { userId } = useParams();
  const { data: userProfile, isLoading, error } = useUserProfileQuery(userId);

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
    <>
      <div className="text-center">
        <Image
          fluid
          roundedCircle
          loading="lazy"
          className="profile-picture-lg border"
          src={userProfile?.data?.profilePictureURL || ""}
          alt={`${userProfile?.data?.lastName}'s Profile`}
        />
      </div>
      <h2 className="text-center mt-3">
        {`${userProfile?.data?.otherNames || ""} ${
          userProfile?.data?.lastName || ""
        }`}
      </h2>
      <p className="text-center mb-0">{userProfile?.data?.email || ""}</p>
    </>
  );

  return (
    <section className="bg-white py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card>
              <Card.Body>
                {error ? (
                  <div className="text-center text-danger">
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
