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
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "../../features/authSlice";
import { clearCartItems } from "../../features/cartSlice";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../../features/usersApiSlice";

export default function VendorDashboard() {
  const [activeLink, setActiveLink] = useState("Home");
  const { userInfo } = useSelector((state) => state.auth);

  const [logout] = useLogoutMutation();

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
      <Row>
        <Col lg={2} className="bg-white vh-100">
          <Container className="py-3">
            <ul class="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <LinkContainer to={"/"}>
                  <Nav.Link>
                    <Image src={logo} alt="logo" width={200} />
                  </Nav.Link>
                </LinkContainer>
              </li>
              {[
                {
                  title: "Home",
                  link: "/vendor/dashboard/home",
                  icon: <FaRegUser />,
                },
                {
                  title: "Dashboard",
                  link: "/vendor/dashboard/home",
                  icon: <FaRegUser />,
                },
                {
                  title: "Orders",
                  link: "/vendor/dashboard/home",
                  icon: <FaRegUser />,
                },
                {
                  title: "Products",
                  link: "/vendor/dashboard/home",
                  icon: <FaRegUser />,
                },
                {
                  title: "Customers",
                  link: "/vendor/dashboard/home",
                  icon: <FaRegUser />,
                },
              ].map(({ title, link, icon }, index) => (
                <li class="nav-item my-3">
                  <Link
                    to={link}
                    class="nav-link active"
                    className={`nav-link ${activeLink === title && "active"}`}
                    onClick={() => setActiveLink(title)}>
                    <h6 className="fw-medium d-flex align-items-center gap-3">
                      {icon}
                      {title}
                    </h6>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Col>
        <Col lg={10} className="bg-light overflow-y-scroll vh-100 p-0">
          <Navbar bg="white" sticky="top" className="py-3">
            <Container>
              <Navbar.Toggle />
              <Navbar.Collapse>
                <Navbar.Text as={"h5"} className="fw-semibold">
                  {`${getGreeting()}`}, <span>{userInfo.data.lastName}!</span>
                </Navbar.Text>
                <Nav className="ms-auto">
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
                      <Dropdown.Item>Action</Dropdown.Item>
                      <Dropdown.Item>Action</Dropdown.Item>
                      <Dropdown.Item>Action</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Container>
            <Outlet />
          </Container>
        </Col>
      </Row>
    </>
  );
}
