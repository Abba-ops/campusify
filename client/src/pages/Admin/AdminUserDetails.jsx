import React from "react";
import { Card, Col, Image, Row, Breadcrumb } from "react-bootstrap";
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
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              <span className="d-inline d-lg-none">
                {`${user?.data?.lastName} ${user?.data?.otherNames}`.slice(
                  0,
                  10
                )}
                {user?.data?.lastName.length + user?.data?.otherNames.length >
                  10 && "..."}
              </span>
              <span className="d-none d-lg-inline">
                {`${user?.data?.lastName} ${user?.data?.otherNames}`.slice(
                  0,
                  20
                )}
                {user?.data?.lastName?.length + user?.data?.otherNames?.length >
                  20 && "..."}
              </span>
            </>
          )}
        </Breadcrumb.Item>
      </Breadcrumb>
      {isLoading ? (
        <>
          {[...Array(6)].map((_, index) => (
            <TablePlaceholder key={index} />
          ))}
        </>
      ) : isError ? (
        <div className="text-center mt-5">
          <h5 className="text-danger">Error Loading User Data</h5>
          <p className="mt-3">
            Failed to load user data. Please try again later.
          </p>
        </div>
      ) : (
        <Row>
          <Col md={6} className="mb-4 mb-lg-0">
            <Card className="border-0 rounded-0 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-center mb-3">
                  <Image
                    fluid
                    roundedCircle
                    loading="lazy"
                    src={user?.data?.profilePictureURL}
                    className="profile-picture-lg border"
                  />
                </div>
                <h5 className="text-center">{`${user?.data?.lastName} ${user?.data?.otherNames}`}</h5>
                <p className="text-center text-muted">{user?.data?.email}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="border-0 rounded-0 shadow-sm">
              <Card.Body>
                <h5>User Profile Information</h5>
                <p>
                  <strong>ID: </strong>
                  {user?.data?._id}
                </p>
                <p>
                  <strong>Email: </strong>
                  {user?.data?.email}
                </p>
                <p>
                  <strong>Phone Number: </strong>
                  {user?.data?.phoneNumber}
                </p>
                <p>
                  <strong>Account Type: </strong>
                  {user?.data?.userType}
                </p>
                <p>
                  <strong>Account Creation Date: </strong>
                  {new Date(user?.data?.accountCreationDate).toLocaleString()}
                </p>
                <p>
                  <strong>Is Admin: </strong>
                  {user?.data?.isAdmin ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Is Vendor: </strong>
                  {user?.data?.isVendor ? "Yes" : "No"}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
