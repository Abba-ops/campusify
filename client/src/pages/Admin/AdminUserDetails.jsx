import React from "react";
import {
  Card,
  Col,
  Image,
  Row,
  Badge,
  Breadcrumb,
  Stack,
  FloatingLabel,
  Form,
} from "react-bootstrap";
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
                {user?.data?.lastName.length + user?.data?.otherNames.length >
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
          <h4 className="text-danger">Error Loading User Data</h4>
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
                <Card.Title className="text-center text-break">{`${user?.data?.lastName}, ${user?.data?.otherNames}`}</Card.Title>
                <Card.Text className="text-muted text-center text-break">
                  {user?.data?.email}
                </Card.Text>
                <Card.Text className="text-muted text-center text-break">
                  {user?.data?.phoneNumber}
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <Stack direction="horizontal" gap={3}>
                    {user?.data?.isAdmin && <Badge bg="success">Admin</Badge>}
                    {user?.data?.isVendor && <Badge bg="success">Vendor</Badge>}
                  </Stack>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="border-0 rounded-0 shadow-sm">
              <Card.Body>
                <Form>
                  <FloatingLabel label="User ID">
                    <Form.Control
                      plaintext
                      readOnly
                      type="text"
                      value={user?.data?._id}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Email">
                    <Form.Control
                      plaintext
                      readOnly
                      type="text"
                      value={user?.data?.email}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Phone Number">
                    <Form.Control
                      plaintext
                      readOnly
                      type="text"
                      value={user?.data?.phoneNumber}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Last Name">
                    <Form.Control
                      plaintext
                      readOnly
                      type="text"
                      value={user?.data?.lastName}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Other Names">
                    <Form.Control
                      plaintext
                      readOnly
                      as="textarea"
                      value={user?.data?.otherNames}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="User Type">
                    <Form.Control
                      plaintext
                      readOnly
                      type="text"
                      value={user?.data?.userType}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Account Creation Date">
                    <Form.Control
                      plaintext
                      readOnly
                      type="text"
                      value={new Date(
                        user?.data?.accountCreationDate
                      ).toLocaleDateString()}
                    />
                  </FloatingLabel>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
