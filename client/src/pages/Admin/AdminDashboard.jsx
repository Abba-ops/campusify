import React from "react";
import { Col, Container, Image, Nav, Navbar, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import MetaTags from "../../components/MetaTags";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "../../features/authSlice";
import { clearCartItems } from "../../features/cartSlice";
import { toast } from "react-toastify";
import { useLogoutUserMutation } from "../../features/usersApiSlice";
import { adminLinks } from "../../constants";
import UserProfileDropdown from "../../components/UserProfileDropdown";

export default function AdminDashboard() {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <>
      <MetaTags
        title="Admin Dashboard - Campusify"
        description="Welcome to the admin dashboard on Campusify. Manage users, products, orders, and settings with ease."
        keywords="admin dashboard, Campusify, users, products, orders, settings"
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
            <Nav className="ms-auto">
              <div className="mb-2 d-lg-none">
                {adminLinks.map(({ title, link, icon }, index) => (
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
            <UserProfileDropdown
              userInfo={userInfo}
              isVendor={userInfo.data.isVendor}
              logoutHandler={logoutHandler}
              showDeleteOption={true}
            />
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
          <Col lg={10} className="bg-light">
            <Container className="py-4">
              <Outlet />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
