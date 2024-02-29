import React from "react";
import { Card, Col, Container, Image, Placeholder, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useUserProfileQuery } from "../features/usersApiSlice";

export default function UserProfile() {
  const { userId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: user, isLoading, error } = useUserProfileQuery(userId);

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
                  <div className="d-flex justify-content-center">
                    <div className="placeholder-glow">
                      <span
                        className="placeholder col-12 profile-picture-lg rounded-pill"
                        style={{ height: "400px" }}></span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-center">
                      <Image
                        fluid
                        roundedCircle
                        loading="lazy"
                        className="profile-picture-lg border"
                        src={user.data.profilePictureURL}
                        alt={`${user.data.lastName}'s Profile`}
                      />
                    </div>
                    <h2 className="text-center mt-3">
                      {`${user.data.otherNames} ${user.data.lastName}`}
                    </h2>
                    <p className="text-center mb-0">{user.data.email}</p>
                    <p className="text-center mb-3">
                      {user.data.phoneNumber || "No phone number provided"}
                    </p>
                    <div className="text-center">{user.data.userType}</div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
