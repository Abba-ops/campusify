import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useUserProfileQuery } from "../features/usersApiSlice";
import { BsArrowLeft } from "react-icons/bs";

export default function UserProfile() {
  const { userId } = useParams();
  const { data: user, isLoading, error } = useUserProfileQuery(userId);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="bg-white py-5">
      <Container>
        <Button
          size="sm"
          variant="outline-dark"
          className="text-uppercase mb-3"
          onClick={() => navigate(-1)}>
          <BsArrowLeft className="me-2" /> Back
        </Button>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card>
              <Card.Body>
                {error ? (
                  <div className="text-center text-danger">
                    Error loading user profile. Please try again later.
                  </div>
                ) : isLoading ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" role="status" variant="dark">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
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
