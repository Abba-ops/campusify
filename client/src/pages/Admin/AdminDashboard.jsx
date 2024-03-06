import React, { useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Image,
  InputGroup,
  ListGroup,
  Nav,
  NavDropdown,
  Navbar,
  Row,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  FaBox,
  FaShoppingCart,
  FaTachometerAlt,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "../../features/authSlice";
import { clearCartItems } from "../../features/cartSlice";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../../features/usersApiSlice";
import TablePlaceholder from "../../components/TablePlaceholder";
import {
  BsBox,
  BsClipboardData,
  BsGraphUp,
  BsPeople,
  BsPersonCheck,
} from "react-icons/bs";
import { adminLinks } from "../../constants";

export default function AdminDashboard() {
  const { userInfo } = useSelector((state) => state.auth);

  const [logout] = useLogoutMutation();

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      dispatch(clearCartItems());
      toast.success("Happy Shopping! Goodbye!");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar bg="white" sticky="top" expand="lg" collapseOnSelect>
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
            <Nav className="ms-auto">
              <div className="my-2 d-lg-none">
                {adminLinks.map(({ title, link, icon }, index) => (
                  <LinkContainer to={link}>
                    <Nav.Link>
                      <div className="d-flex align-items-center gap-3">
                        {icon}
                        {title}
                      </div>
                    </Nav.Link>
                  </LinkContainer>
                ))}
              </div>
              <Dropdown align="end">
                <Dropdown.Toggle as="span">
                  <Image
                    fluid
                    roundedCircle
                    loading="lazy"
                    className="profile-picture-sm"
                    src={userInfo && userInfo.data.profilePictureURL}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Header>
                    {(userInfo && userInfo.data.lastName) || "User"} Options
                  </Dropdown.Header>
                  <LinkContainer to="/profile">
                    <Dropdown.Item>View Profile</Dropdown.Item>
                  </LinkContainer>
                  {userInfo && userInfo.data.isAdmin && (
                    <LinkContainer to="/admin/dashboard/">
                      <Dropdown.Item>Admin Dashboard</Dropdown.Item>
                    </LinkContainer>
                  )}
                  {userInfo && userInfo.data.isVendor && (
                    <LinkContainer to="/vendor/dashboard/">
                      <Dropdown.Item>Vendor Dashboard</Dropdown.Item>
                    </LinkContainer>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          <Col lg={2} className="vh-100 d-none d-lg-block">
            <ul className="nav nav-pills flex-column mb-auto">
              {adminLinks.map(({ title, link, icon }, index) => (
                <li className="nav-item my-3" key={index}>
                  <Link
                    to={link}
                    className={`nav-link ${
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
          <Col lg={10} className="bg-light vh-100">
            <Container className="py-4">
              <Outlet />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
