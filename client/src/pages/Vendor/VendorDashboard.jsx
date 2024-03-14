import React, { useState } from "react";
import {
  Col,
  Container,
  Dropdown,
  Image,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  FaBox,
  FaChartLine,
  FaRegUser,
  FaShoppingBasket,
  FaUsers,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "../../features/authSlice";
import { clearCartItems } from "../../features/cartSlice";
import { toast } from "react-toastify";
import { useLogoutUserMutation } from "../../features/usersApiSlice";
import { BsBarChart, BsBox, BsCart, BsPeople, BsPerson } from "react-icons/bs";
import { vendorLinks } from "../../constants";

export default function VendorDashboard() {
  const location = useLocation();

  console.log(location);

  const [activeLink, setActiveLink] = useState("Home");
  const { userInfo } = useSelector((state) => state.auth);

  const [logoutUser] = useLogoutUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(clearCredentials());
      dispatch(clearCartItems());
      toast.success("Happy Shopping! Goodbye!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const getGreeting = () => {
    const currentTime = new Date().getHours();

    if (currentTime >= 0 && currentTime < 12) {
      return "Good Morning";
    } else if (currentTime >= 12 && currentTime < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <>
      <Navbar bg="white" sticky="top" collapseOnSelect expand="lg">
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
                {vendorLinks.map(({ title, link, icon }, index) => (
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
              <Dropdown align={"end"}>
                <Dropdown.Toggle variant="success" as={"span"}>
                  <Image
                    fluid
                    roundedCircle
                    loading="lazy"
                    className="profile-picture-sm"
                    src={userInfo.data.profilePictureURL}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Header>
                    {userInfo.data.lastName || "User"} Options
                  </Dropdown.Header>
                  <LinkContainer to="/profile">
                    <Dropdown.Item>View Profile</Dropdown.Item>
                  </LinkContainer>
                  {userInfo.data.isAdmin && (
                    <LinkContainer to="/admin/dashboard/">
                      <Dropdown.Item>Admin Dashboard</Dropdown.Item>
                    </LinkContainer>
                  )}
                  {userInfo.data.isVendor && (
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
          <Col md={2} className="vh-100 d-none d-lg-block">
            <ul class="nav nav-pills flex-column mb-auto">
              {vendorLinks.map(({ title, link, icon }, index) => (
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
