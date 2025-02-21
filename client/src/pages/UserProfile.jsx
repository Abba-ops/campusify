import { useEffect } from "react";
import { Badge, Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetUserProfileQuery } from "../features/usersApiSlice";
import MetaTags from "../components/MetaTags";

export default function UserProfile() {
  const { userId } = useParams();

  const {
    data: userProfile,
    isLoading: isLoadingUserProfile,
    isError: isErrorUserProfile,
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
        src={userProfile?.data?.profilePictureURL}
        alt={`${userProfile?.data?.lastName}'s Profile`}
      />
      <h5 className="mt-3">
        {`${userProfile?.data?.otherNames} ${userProfile?.data?.lastName}`}
      </h5>
      <p>
        <Link
          to={`mailto:${userProfile?.data?.email}`}
          className="text-decoration-none">
          {userProfile?.data?.email}
        </Link>
      </p>
      {userProfile?.data?.isVendor && (
        <Badge className="ml-2" variant="primary">
          Vendor
        </Badge>
      )}
    </div>
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-5">
      {userProfile && userProfile?.data && (
        <MetaTags
          title={`${userProfile?.data?.otherNames || ""} ${
            userProfile?.data?.lastName || ""
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
                {isErrorUserProfile ? (
                  <div className="text-center mt-5">
                    <h5 className="text-danger">Error Loading User Profile</h5>
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
        </Row>
      </Container>
    </section>
  );
}
