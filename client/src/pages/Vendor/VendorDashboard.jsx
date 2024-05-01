import React, { useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Dropdown,
  Image,
  Nav,
  Navbar,
  Row,
  Stack,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import MetaTags from "../../components/MetaTags";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "../../features/authSlice";
import { clearCartItems } from "../../features/cartSlice";
import { toast } from "react-toastify";
import { useLogoutUserMutation } from "../../features/usersApiSlice";
import { vendorLinks } from "../../constants";
import UserProfileDropdown from "../../components/UserProfileDropdown";
import {
  useDeleteNotificationMutation,
  useGetVendorNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from "../../features/vendorApiSlice";
import { RiNotificationLine } from "react-icons/ri";

export default function VendorDashboard() {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMessagesDropdown, setShowMessagesDropdown] = useState(false);

  const {
    data: notifications,
    isLoading,
    refetch: refetchNotifications,
  } = useGetVendorNotificationsQuery();

  const [markNotificationAsRead, { isLoading: isLoadingMarkNotification }] =
    useMarkNotificationAsReadMutation();

  const [deleteNotification, { isLoading: isLoadingDeleteNotification }] =
    useDeleteNotificationMutation();

  const logoutHandler = async () => {
    try {
      const response = await logoutUser().unwrap();
      if (response.success) {
        dispatch(clearCredentials());
        dispatch(clearCartItems());
        toast.success(response.message);
        navigate("/");
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      const res = await markNotificationAsRead(notificationId).unwrap();
      if (res.success) {
        refetchNotifications();
        toast.success(res.message);
      }
    } catch (error) {}
  };

  const handleDeleteMessage = async (notificationId) => {
    try {
      const res = await deleteNotification(notificationId).unwrap();
      if (res.success) {
        refetchNotifications();
        toast.success(res.message);
      }
    } catch (error) {}
  };

  const toggleMessagesDropdown = () =>
    setShowMessagesDropdown(!showMessagesDropdown);

  const unreadNotifications = notifications
    ? notifications.data.filter((notification) => !notification.read)
    : [];

  return (
    <>
      <MetaTags
        title={`${
          userInfo?.data?.vendor.vendorName || "Vendor Dashboard"
        } - Campusify`}
        description={`Manage your products, orders, and settings with ease on the ${
          userInfo?.data?.vendor.vendorName || "Vendor Dashboard"
        } by Campusify.`}
        keywords={`vendor dashboard, ${
          userInfo?.data?.vendor.vendorName || "Vendor"
        }, products, orders, settings, Campusify`}
      />
      <Navbar
        bg="white"
        expand="lg"
        sticky="top"
        collapseOnSelect
        className="navbar-shadow">
        <Container fluid>
          <Navbar.Brand>
            <LinkContainer to={"/"}>
              <Nav.Link>
                <Image src={logo} alt="logo" width={200} />
              </Nav.Link>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Stack direction="horizontal" gap={4} className="ms-auto">
              <Dropdown align={"end"} show={showMessagesDropdown}>
                <Nav.Link onClick={toggleMessagesDropdown}>
                  <div className="position-relative">
                    <RiNotificationLine size={24} />
                    {notifications && notifications.data.length > 0 && (
                      <Badge
                        pill
                        bg="primary"
                        className="position-absolute top-0 start-100 translate-middle">
                        {unreadNotifications.length}
                      </Badge>
                    )}
                  </div>
                </Nav.Link>
                {isLoading ? (
                  <Dropdown.Menu>
                    <div className="notification-dropdown">
                      <div>Loading...</div>
                    </div>
                  </Dropdown.Menu>
                ) : (
                  <Dropdown.Menu>
                    {notifications && notifications.data.length > 0 ? (
                      notifications.data
                        .filter((notification) => !notification.read)
                        .slice(0, 3)
                        .map((notification) => (
                          <div
                            className="notification-dropdown"
                            key={notification._id}>
                            <Link
                              to={`/vendor/dashboard/orders/${notification.orderId}`}
                              className="text-decoration-none">
                              {notification.message}
                            </Link>
                            <Stack direction="horizontal">
                              <Button
                                size="sm"
                                variant="link"
                                disabled={
                                  notification.read || isLoadingMarkNotification
                                }
                                className="text-decoration-none"
                                onClick={() =>
                                  handleMarkAsRead(notification._id)
                                }>
                                Mark as Read
                              </Button>
                              <Button
                                size="sm"
                                variant="link"
                                className="text-decoration-none"
                                disabled={isLoadingDeleteNotification}
                                onClick={() =>
                                  handleDeleteMessage(notification._id)
                                }>
                                Delete
                              </Button>
                            </Stack>
                          </div>
                        ))
                    ) : (
                      <div className="notification-dropdown">
                        <div>No unread notifications</div>
                      </div>
                    )}
                  </Dropdown.Menu>
                )}
              </Dropdown>
              <UserProfileDropdown
                userInfo={userInfo}
                isAdmin={userInfo.data.isAdmin}
                logoutHandler={logoutHandler}
                showDeleteOption={true}
              />
            </Stack>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          <Col md={2} className="vh-100 d-none d-lg-block">
            <ul className="nav nav-pills flex-column mb-auto">
              {vendorLinks.map(({ title, link, icon }, index) => (
                <li className="nav-item my-3" key={index}>
                  <Link
                    to={link}
                    className={`nav-link fw-semibold ${
                      location.pathname === link && "active"
                    }`}>
                    <div className="d-flex align-items-center gap-3">
                      {icon}
                      {title}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col md={10} className="bg-light">
            <Container className="py-4">
              <Outlet />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
