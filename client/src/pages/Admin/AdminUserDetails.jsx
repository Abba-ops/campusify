import React from "react";
import {
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
  Badge,
  Button,
} from "react-bootstrap";
import { useGetUserByIdQuery } from "../../features/usersApiSlice";
import { useParams } from "react-router-dom";

export default function AdminUserDetails() {
  const { userId } = useParams();

  const { data: user, isLoading, isError } = useGetUserByIdQuery(userId);

  return (
    <>
      {isLoading ? (
        <Row>
          <Col md={4}>
            <p>Loading...</p>
          </Col>
        </Row>
      ) : isError ? (
        <Row>
          <Col md={4}>
            <p>Error loading user details</p>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md={4}>
            <Card className="p-3">
              <div className="d-flex justify-content-center my-3">
                <Image
                  fluid
                  roundedCircle
                  loading="lazy"
                  className="profile-picture-lg border"
                  src={user.data.profilePictureURL}
                />
              </div>
              <Card.Title>
                {`${user.data.lastName}, ${user.data.otherNames}`}
                {user.data.isAdmin && (
                  <Badge bg="success" className="ms-2">
                    Admin
                  </Badge>
                )}
                {user.data.isVendor && (
                  <Badge bg="primary" className="ms-2">
                    Vendor
                  </Badge>
                )}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {user.data.email}
              </Card.Subtitle>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>User Type:</strong> {user.data.userType}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Phone Number:</strong> {user.data.phoneNumber}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Account Creation Date:</strong>{" "}
                  {new Date(user.data.accountCreationDate).toLocaleString()}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col md={8}>
            <Card className="p-3">
              <h2 className="mb-4">User Details</h2>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>
                    <strong>User ID:</strong>
                  </span>
                  <span>{user.data._id}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>
                    <strong>Password:</strong>
                  </span>
                  <span className="text-muted">(Encrypted)</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>
                    <strong>Last Updated:</strong>
                  </span>
                  <span>{new Date(user.data.updatedAt).toLocaleString()}</span>
                </ListGroup.Item>
              </ListGroup>
              <div className="mt-4 d-flex justify-content-end">
                <Button variant="danger">Delete User</Button>
              </div>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
