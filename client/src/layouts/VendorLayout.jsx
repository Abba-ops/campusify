import React, { useState } from "react";
import {
  Col,
  Container,
  Image,
  Nav,
  Navbar,
  Row,
  Stack,
} from "react-bootstrap";
import {
  useDeleteNotificationMutation,
  useGetVendorNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from "../features/vendorApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserProfileDropdown from "../components/UserProfileDropdown";
import { useLogoutUserMutation } from "../features/usersApiSlice";
import { clearCredentials } from "../features/authSlice";
import { clearCartItems } from "../features/cartSlice";
import MetaTags from "../components/MetaTags";
import { vendorLinks } from "../constants";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";

export default function VendorLayout() {
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
      if (response?.success) {
        dispatch(clearCredentials());
        dispatch(clearCartItems());
        toast.success(response?.message);
        navigate("/");
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      const res = await markNotificationAsRead(notificationId).unwrap();
      if (res?.success) {
        refetchNotifications();
        toast.success(res?.message);
      }
    } catch (error) {
      toast.error("Failed to mark notification as read. Please try again.");
    }
  };

  const handleDeleteMessage = async (notificationId) => {
    try {
      const res = await deleteNotification(notificationId).unwrap();
      if (res?.success) {
        refetchNotifications();
        toast.success(res?.message);
      }
    } catch (error) {
      toast.error("Failed to delete notification. Please try again.");
    }
  };

  const toggleMessagesDropdown = () => setShowMessagesDropdown((prev) => !prev);

  const unreadNotifications = notifications
    ? notifications.data.filter((notification) => !notification.read)
    : [];

  return (
    <>
      <MetaTags
        title={`${
          userInfo?.data?.vendor?.vendorName || "Vendor Dashboard"
        } - Campusify`}
        description={`Manage your products, orders, and settings with ease on the ${
          userInfo?.data?.vendor?.vendorName || "Vendor Dashboard"
        } by Campusify.`}
        keywords={`vendor dashboard, ${
          userInfo?.data?.vendor?.vendorName || "Vendor"
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
            <LinkContainer to="/">
              <Nav.Link>
                <Image src={logo} alt="logo" width={200} />
              </Nav.Link>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <div className="mb-2 d-lg-none">
                {vendorLinks.map(({ title, link, icon }, index) => (
                  <LinkContainer to={link} key={index} className="fw-semibold">
                    <Nav.Link>
                      <div className="d-flex align-items-center gap-3">
                        {icon}
                        {title}
                      </div>
                    </Nav.Link>
                  </LinkContainer>
                ))}
              </div>
            </Nav>
            <Stack
              gap={4}
              direction="horizontal"
              className="justify-content-end">
              <UserProfileDropdown
                userInfo={userInfo}
                isAdmin={userInfo?.data?.isAdmin}
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
