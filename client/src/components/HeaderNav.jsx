import React, { useState } from "react";
import {
  Nav,
  Form,
  Stack,
  Image,
  Badge,
  Button,
  Navbar,
  Dropdown,
  Container,
  InputGroup,
  Offcanvas,
} from "react-bootstrap";
import { BiCategoryAlt } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { RiShoppingBag2Line, RiUserLine, RiSearch2Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../features/usersApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";
import { clearCredentials } from "../features/authSlice";
import { clearCartItems } from "../features/cartSlice";

export default function HeaderNav() {
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const location = useLocation();
  const [logout] = useLogoutMutation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowSearch = () => setShowSearch((prev) => !prev);

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      dispatch(clearCartItems());
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar
        expand="lg"
        sticky="top"
        collapseOnSelect
        className={`p-0 bg-light ${
          !(location.pathname === "/") && "bg-white border-bottom"
        }`}>
        <Container
          className={`bg-white py-2 py-lg-3 ${
            location.pathname === "/" && "border-bottom"
          }`}>
          <Navbar.Brand>
            <LinkContainer to={"/"}>
              <Nav.Link>
                <Image src={logo} alt="logo" width={200} />
              </Nav.Link>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto mb-3 mb-lg-0">
              <Stack direction="horizontal" gap={4}>
                {["/", "/contact", "/about", "/faq"].map((path) => (
                  <LinkContainer key={path} to={path}>
                    <Nav.Link
                      className={`fw-semibold text-uppercase ${
                        location.pathname === path && "text-primary"
                      }`}>
                      {path === "/" ? "Home" : path.replace("/", "")}
                    </Nav.Link>
                  </LinkContainer>
                ))}
              </Stack>
            </Nav>
            {showSearch && (
              <InputGroup className="mb-3 mb-lg-0 me-lg-4 w-auto">
                <Form.Control
                  type="text"
                  className="rounded-0"
                  placeholder="Enter Your Search"
                />
                <Button variant="primary" className="text-white rounded-0">
                  <FaSearch />
                </Button>
              </InputGroup>
            )}
            <Stack direction="horizontal" gap={4}>
              <Nav.Link>
                <RiSearch2Line className="fs-4" onClick={handleShowSearch} />
              </Nav.Link>
              <Nav.Link>
                <BiCategoryAlt className="fs-4" onClick={handleShow} />
              </Nav.Link>
              <LinkContainer to={"/cart"}>
                <Nav.Link>
                  <div className="position-relative">
                    <RiShoppingBag2Line className="fs-4" />
                    {cartItems.length > 0 && (
                      <Badge
                        pill
                        bg="primary"
                        className="position-absolute top-0 start-100 translate-middle">
                        {cartItems.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        )}
                      </Badge>
                    )}
                  </div>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
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
                    <Nav.Link>
                      <LinkContainer to="/profile">
                        <Dropdown.Item>View Profile</Dropdown.Item>
                      </LinkContainer>
                    </Nav.Link>
                    {userInfo.data.isAdmin && (
                      <Nav.Link>
                        <LinkContainer to="/admin/dashboard/">
                          <Dropdown.Item>Admin Dashboard</Dropdown.Item>
                        </LinkContainer>
                      </Nav.Link>
                    )}
                    {userInfo.data.isVendor && (
                      <Nav.Link>
                        <LinkContainer to="/vendor/dashboard/">
                          <Dropdown.Item>Vendor Dashboard</Dropdown.Item>
                        </LinkContainer>
                      </Nav.Link>
                    )}
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logoutHandler}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <LinkContainer to={"/login"}>
                  <RiUserLine className="fs-4" />
                </LinkContainer>
              )}
            </Stack>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as a placeholder. In real life, you can have the elements
          you have chosen, like text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
