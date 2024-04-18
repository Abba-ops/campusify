import React, { useEffect, useState } from "react";
import { useUpdateUserPasswordMutation } from "../features/usersApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
  Badge,
  Spinner,
  Alert,
  Tooltip,
  OverlayTrigger,
  ButtonGroup,
  Table,
} from "react-bootstrap";
import MetaTags from "../components/MetaTags";
import { useGetMyOrdersQuery } from "../features/ordersApiSlice";
import { BsEye, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../utils/cartUtils";
import TablePlaceholder from "../components/TablePlaceholder";

export default function UserProfileDetails() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);

  const {
    data: orders,
    isLoading: loadingOrders,
    isError: ordersError,
  } = useGetMyOrdersQuery();
  const [updateUserPassword, { isLoading }] = useUpdateUserPasswordMutation();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const { userInfo } = useSelector((state) => state.auth);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const response = await updateUserPassword({ password }).unwrap();
        if (response.success) {
          toast.success(response.message);
          setConfirmPassword("");
          setPassword("");
        }
      } catch (error) {
        toast.error(
          (error && error.data.message) ||
            "An error occurred while updating password."
        );
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-5">
      <MetaTags
        title="User Profile - Campusify"
        description="Manage your account details and order history on Campusify."
        keywords="user profile, account information, order history, Campusify"
      />
      <Container>
        <Row>
          <Col lg={4} className="mb-6 mb-lg-0">
            {userInfo &&
              userInfo.data.vendor &&
              userInfo.data.vendor.approvalStatus === "pending" &&
              show && (
                <Alert
                  dismissible
                  className="rounded-0 border-0"
                  onClose={() => setShow(false)}
                  variant="warning">
                  <Alert.Heading>Vendor Approval Pending</Alert.Heading>
                  <p>
                    Your vendor account approval is pending. You won't be able
                    to access vendor features until your account is approved.
                    Please contact support for assistance.
                  </p>
                </Alert>
              )}
            {userInfo &&
              userInfo.data.vendor &&
              userInfo.data.vendor.approvalDate &&
              (new Date() - new Date(userInfo.data.vendor.approvalDate)) /
                (1000 * 60 * 60 * 24) <
                7 && (
                <Alert
                  dismissible
                  className="rounded-0 border-0"
                  onClose={() => setShow(false)}
                  variant="success">
                  <Alert.Heading>Vendor Account Approved</Alert.Heading>
                  <p>
                    Congratulations! Your vendor account has been approved. You
                    can now access vendor features and start selling your
                    products/services.
                  </p>
                </Alert>
              )}
            <h5 className="text-uppercase text-center mb-3">
              Personal Information
            </h5>
            <ListGroup>
              <ListGroup.Item className="text-center">
                <div className="d-flex justify-content-center my-3">
                  <Image
                    fluid
                    roundedCircle
                    loading="lazy"
                    className="profile-picture-lg border"
                    src={userInfo.data.profilePictureURL}
                  />
                </div>
                <h4 className="mb-2">{`${userInfo.data.otherNames} ${userInfo.data.lastName}`}</h4>
                <p className="mb-1">{userInfo.data.email}</p>
                <div className="mb-2">
                  {userInfo.data.vendor ? (
                    userInfo.data.vendor.isApproved ? (
                      <Badge bg="dark">Approved</Badge>
                    ) : (
                      <Badge bg="danger">Not Approved</Badge>
                    )
                  ) : null}
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form>
                  <Form.Group className="mb-3 text-center text-lg-start">
                    <Form.Label htmlFor="password">New Password</Form.Label>
                    <Form.Control
                      required
                      value={password}
                      spellCheck={false}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 text-center text-lg-start">
                    <Form.Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Form.Label>
                    <Form.Control
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Show Password"
                      checked={showPassword}
                      onChange={togglePasswordVisibility}
                    />
                  </Form.Group>
                  <div className="mb-3 d-flex justify-content-center">
                    <Button
                      onClick={handleUpdatePassword}
                      className="text-uppercase px-4 fw-semibold"
                      variant="dark">
                      {isLoading ? (
                        <Spinner size="sm" animation="border" />
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </div>
                </Form>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={8}>
            <h5 className="text-uppercase text-center mb-3">
              Purchase History
            </h5>
            {loadingOrders ? (
              <>
                {[...Array(5)].map((_, index) => (
                  <TablePlaceholder key={index} />
                ))}
              </>
            ) : ordersError ? (
              <div className="text-center mt-5">
                <h4 className="text-danger">Error Loading Orders</h4>
                <p className="mt-3">
                  Failed to load order history. Please try again later.
                </p>
              </div>
            ) : orders.data.length === 0 ? (
              <div className="text-center mt-5">
                <h4>Oops! No orders found.</h4>
                <p>It seems we couldn't find any orders at the moment.</p>
              </div>
            ) : (
              <Table size="sm" responsive striped>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Items Price</th>
                    <th>Tax Price</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Completion Status</th>
                    <th>Order Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.data.map((order) => (
                    <tr key={order.orderID}>
                      <td>{order.orderID}</td>
                      <td>&#8358;{numberWithCommas(order.itemsPrice)}</td>
                      <td>&#8358;{numberWithCommas(order.taxPrice)}</td>
                      <td>&#8358;{numberWithCommas(order.totalPrice)}</td>
                      <td>{order.isPaid ? "Paid" : "Unpaid"}</td>
                      <td>
                        {order.isOrderDelivered ? "Completed" : "Pending"}
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <ButtonGroup size="sm">
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-view">View</Tooltip>}>
                            <Button
                              as={Link}
                              to={`/order/${order.orderID}`}
                              variant="light">
                              <BsEye />
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="tooltip-delete">Delete</Tooltip>
                            }>
                            <Button variant="light">
                              <BsTrash />
                            </Button>
                          </OverlayTrigger>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
