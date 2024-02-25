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
  Stack,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  FaBox,
  FaProductHunt,
  FaRegUser,
  FaSearch,
  FaShoppingCart,
  FaTachometerAlt,
  FaTruckLoading,
  FaUserFriends,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "../../features/authSlice";

import { clearCartItems } from "../../features/cartSlice";
import { MdOutlineDashboard } from "react-icons/md";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../../features/usersApiSlice";

import { IoMdNotificationsOutline } from "react-icons/io";
export default function AdminDashboard() {
  const [activeLink, setActiveLink] = useState("Dashboard");

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      dispatch(clearCartItems());
      toast.success("Happy Shopping! Goodbye!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="vh-100 overflow-x-hidden">
      <Navbar expand="lg" sticky="top" bg="white" className="border-bottom">
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
              <Stack direction="vertical" gap={3} className="d-lg-none d-block">
                {[
                  {
                    title: "Dashboard",
                    link: "/admin/dashboard/",
                    icon: <FaRegUser />,
                  },
                  {
                    title: "Users",
                    link: "/admin/dashboard/users",
                    icon: <FaUserFriends />,
                  },
                  {
                    title: "Orders",
                    link: "/admin/dashboard/orders",
                    icon: <FaShoppingCart />,
                  },
                  {
                    title: "Products",
                    link: "/admin/dashboard/products",
                    icon: <FaProductHunt />,
                  },
                  {
                    title: "Vendors",
                    link: "/admin/dashboard/vendors",
                    icon: <FaTruckLoading />,
                  },
                ].map(({ title, link, icon }, index) => (
                  <Nav.Link>
                    <LinkContainer
                      to={link}
                      class="nav-link active"
                      className={`nav-link ${activeLink === title && "active"}`}
                      onClick={() => setActiveLink(title)}>
                      <div className="d-flex align-items-center gap-3">
                        {icon}
                        {title}
                      </div>
                    </LinkContainer>
                  </Nav.Link>
                ))}
              </Stack>
              <Stack direction="horizontal" gap={2}>
                <Dropdown align={"end"}>
                  <Dropdown.Toggle as={"span"}>
                    <Image
                      fluid
                      roundedCircle
                      loading="lazy"
                      className="profile-picture-sm ms-3"
                      src={userInfo.data.profilePictureURL}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item onClick={logoutHandler}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Stack>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row>
        <Col lg={2} className="bg-white border-end">
          <Navbar expand="lg">
            <Container>
              <Navbar.Collapse>
                <Stack direction="vertical" gap={4}>
                  <ul class="nav nav-pills flex-column mb-auto">
                    {[
                      {
                        title: "Dashboard",
                        link: "/admin/dashboard/",
                        icon: <FaTachometerAlt />,
                      },
                      {
                        title: "Users",
                        link: "/admin/dashboard/users",
                        icon: <FaUsers />,
                      },
                      {
                        title: "Orders",
                        link: "/admin/dashboard/orders",
                        icon: <FaShoppingCart />,
                      },
                      {
                        title: "Products",
                        link: "/admin/dashboard/products",
                        icon: <FaBox />,
                      },
                      {
                        title: "Vendors",
                        link: "/admin/dashboard/vendors",
                        icon: <FaUserTie />,
                      },
                    ].map(({ title, link, icon }, index) => (
                      <li class="nav-item my-2">
                        <Link
                          to={link}
                          class="nav-link active"
                          className={`nav-link ${
                            activeLink === title && "active"
                          }`}
                          onClick={() => setActiveLink(title)}>
                          <div className="d-flex align-items-center gap-3">
                            {icon}
                            {title}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Stack>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Col>
        <Col lg={10} className="">
          <Container className="py-3">
            <Outlet />
          </Container>
        </Col>
      </Row>
    </div>
  );
}
