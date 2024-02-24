import {
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useGetUserDetailsQuery } from "../../features/usersApiSlice";
import { useParams } from "react-router-dom";

export default function AdminUserDetails() {
  const { userId } = useParams();

  const { data: user, isLoading } = useGetUserDetailsQuery(userId);

  return (
    <Row>
      <Col className="bg-white" as={Card}>
        {!isLoading && (
          <ListGroup variant="flush">
            <ListGroup.Item>
              <div className="d-flex justify-content-center my-3">
                <Image
                  fluid
                  roundedCircle
                  loading="lazy"
                  className="profile-picture-lg border"
                  src={user.data.profilePictureURL}
                />
              </div>
            </ListGroup.Item>
            <ListGroup.Item>User ID: {user.data._id}</ListGroup.Item>
            <ListGroup.Item>
              Full Name: {user.data.lastName} {user.data.otherNames}
            </ListGroup.Item>
            <ListGroup.Item>Email Address: {user.data.email}</ListGroup.Item>
            <ListGroup.Item>
              Email Address: {user.data.phoneNumber}
            </ListGroup.Item>
            <ListGroup.Item>
              Admin Status: {user.data.isAdmin ? "Yes" : "No"}
            </ListGroup.Item>
            <ListGroup.Item>
              Vendor Status: {user.data.isVendor ? "Yes" : "No"}
            </ListGroup.Item>

            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        )}
      </Col>
      <Col></Col>
    </Row>
  );
}
