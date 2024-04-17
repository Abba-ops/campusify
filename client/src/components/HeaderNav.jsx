import React, { useState } from "react";
import { Nav, Stack, Image, Badge, Navbar, Container } from "react-bootstrap";
import { BiCategoryAlt } from "react-icons/bi";
import { RiShoppingBag2Line, RiUserLine, RiSearch2Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../features/usersApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";
import { clearCredentials } from "../features/authSlice";
import { clearCartItems } from "../features/cartSlice";
import { useGetCategoriesQuery } from "../features/productsApiSlice";
import CategoryOffcanvas from "./CategoryOffcanvas";
import SearchForm from "./SearchForm";
import UserProfileDropdown from "./UserProfileDropdown";

export default function HeaderNav() {
  const [showSearch, setShowSearch] = useState(false);
  const [show, setShow] = useState(false);

  const {
    data: categories,
    isLoading: loadingCategories,
    isError: errorCategories,
  } = useGetCategoriesQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const location = useLocation();
  const [logoutUser] = useLogoutUserMutation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowSearch = () => setShowSearch((prev) => !prev);

  const handleSearchSubmit = (searchQuery) => {
    navigate(`/search/${searchQuery}`);
  };

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
      <Navbar
        expand="lg"
        sticky="top"
        collapseOnSelect
        className={`p-0 bg-light ${
          location.pathname !== "/" && "bg-white navbar-shadow"
        }`}>
        <Container
          className={`bg-white py-2 py-lg-3 ${
            location.pathname === "/" && "navbar-shadow"
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
            <Nav className="me-auto">
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
            {showSearch && <SearchForm onSubmit={handleSearchSubmit} />}
            <Stack direction="horizontal" gap={4}>
              <Nav.Link>
                <RiSearch2Line size={24} onClick={handleShowSearch} />
              </Nav.Link>
              <Nav.Link>
                <BiCategoryAlt size={24} onClick={handleShow} />
              </Nav.Link>
              <LinkContainer to={"/cart"}>
                <Nav.Link>
                  <div className="position-relative">
                    <RiShoppingBag2Line size={24} />
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
                <UserProfileDropdown
                  userInfo={userInfo}
                  isAdmin={userInfo.data.isAdmin}
                  isVendor={userInfo.data.isVendor}
                  logoutHandler={logoutHandler}
                  showDeleteOption={true}
                />
              ) : (
                <LinkContainer to={"/login"}>
                  <Nav.Link>
                    <RiUserLine size={24} />
                  </Nav.Link>
                </LinkContainer>
              )}
            </Stack>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CategoryOffcanvas
        show={show}
        categories={categories}
        isError={errorCategories}
        isLoading={loadingCategories}
        handleClose={handleClose}
      />
    </>
  );
}
