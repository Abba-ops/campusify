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
import { useLogoutMutation } from "../features/usersApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { FaSearch } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RiShoppingBag2Line, RiUserLine, RiSearch2Line } from "react-icons/ri";
import { clearCredentials } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearCartItems } from "../features/cartSlice";

export default function HeaderNav() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showSearch, setShowSearch] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const handleShowSearch = () => setShowSearch((prev) => !prev);

  const location = useLocation();
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
                <LinkContainer to={"/"}>
                  <Nav.Link
                    className={`fw-semibold text-uppercase ${
                      location.pathname === "/" && "text-primary"
                    }`}>
                    Home
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/contact"}>
                  <Nav.Link
                    className={`fw-semibold text-uppercase ${
                      location.pathname === "/contact" && "text-primary"
                    }`}>
                    Contact Us
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/about"}>
                  <Nav.Link
                    className={`fw-semibold text-uppercase ${
                      location.pathname === "/about" && "text-primary"
                    }`}>
                    About Us
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/faq"}>
                  <Nav.Link
                    className={`fw-semibold text-uppercase ${
                      location.pathname === "/faq" && "text-primary"
                    }`}>
                    FAQ
                  </Nav.Link>
                </LinkContainer>
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
                  <Dropdown.Menu className="">
                    <Nav.Link>
                      <LinkContainer to="/profile">
                        <Dropdown.Item>Profile</Dropdown.Item>
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
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
