import React from "react";
import { Card, Col, Row, Breadcrumb, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../features/usersApiSlice";
import TablePlaceholder from "../../components/TablePlaceholder";

export default function AdminUserDetails() {
  const { userId } = useParams();
  const { data: user, isLoading, isError } = useGetUserByIdQuery(userId);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin/dashboard/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin/dashboard/users">Users</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          {isLoading
            ? "Loading..."
            : `${user.data.lastName} ${user.data.otherNames}`}
        </Breadcrumb.Item>
      </Breadcrumb>

      {isLoading ? (
        <Row>
          {[...Array(6)].map((_, index) => (
            <TablePlaceholder key={index} />
          ))}
        </Row>
      ) : isError ? (
        <div className="text-center mt-5">
          <h4 className="text-danger">Error Loading User Data</h4>
          <p className="mt-3">
            Failed to load user data. Please try again later.
          </p>
        </div>
      ) : (
        <Row>
          <Col md={6}>
            <Card className="border-0 rounded-0">
              <Card.Body>
                <div className="text-center">
                  <Image
                    src={user.data.profilePictureURL}
                    roundedCircle
                    className="profile-picture-lg"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-5 mb-lg-0">
            <Card className="border-0 rounded-0">
              <Card.Body>
                <div className="mb-4">
                  <strong>Last Name:</strong> {user.data.lastName}
                </div>
                <div className="mb-4">
                  <strong>Other Names:</strong> {user.data.otherNames}
                </div>
                <div className="mb-4">
                  <strong>Email:</strong> {user.data.email}
                </div>
                <div className="mb-4">
                  <strong>Phone Number:</strong> {user.data.phoneNumber}
                </div>
                <div>
                  <strong>Account Creation Date:</strong>{" "}
                  {new Date(user.data.accountCreationDate).toLocaleDateString()}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
