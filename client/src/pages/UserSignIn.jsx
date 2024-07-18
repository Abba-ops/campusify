import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../features/authSlice";
import { toast } from "react-toastify";
import { useAuthUserMutation } from "../features/usersApiSlice";
import {
  Container,
  Button,
  Col,
  Row,
  Spinner,
  Form,
  InputGroup,
  Card,
} from "react-bootstrap";
import MetaTags from "../components/MetaTags";
import BackToTop from "../components/BackToTop";

export default function UserSignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirectPath = searchParams.get("redirect") || "/";

  const [authenticateUser, { isLoading }] = useAuthUserMutation();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await authenticateUser({ email, password }).unwrap();

      if (response?.success) {
        dispatch(setCredentials({ ...response }));
        toast.success(response?.message);
        navigate(redirectPath);
      }
    } catch (error) {
      toast.error(
        (error && error?.data?.message) || "Sign in failed. Please try again."
      );
    }
  };

  useEffect(() => {
    if (userInfo) navigate(redirectPath);
  }, [userInfo, redirectPath, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-5">
      <MetaTags
        title="Log In - Campusify"
        description="Log in to your Campusify account to access the ultimate campus marketplace."
        keywords="Campusify, log in, sign in, campus marketplace"
      />
      <Container>
        <h4 className="border-bottom pb-3 text-center">
          Log In to Your Account
        </h4>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="my-3 py-3">
              <Card.Body>
                <Form onSubmit={handleSignIn}>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      Email
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control
                        required
                        type="email"
                        value={email}
                        spellCheck={false}
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      Password
                    </Form.Label>
                    <Col sm={6}>
                      <InputGroup>
                        <Form.Control
                          required
                          value={password}
                          spellCheck={false}
                          type={showPassword ? "text" : "password"}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                          variant="secondary"
                          onClick={togglePasswordVisibility}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputGroup>
                    </Col>
                  </Form.Group>
                  <div className="text-center">
                    <Link to="#" className="text-decoration-none">
                      Forgot your password?
                    </Link>
                  </div>
                  <div className="d-flex justify-content-center my-3 border-bottom pb-3">
                    <Button
                      type="submit"
                      variant="dark"
                      disabled={isLoading}
                      className="px-4">
                      {isLoading ? (
                        <Spinner size="sm" animation="border">
                          <span className="visually-hidden"></span>
                        </Spinner>
                      ) : (
                        "Log In"
                      )}
                    </Button>
                  </div>
                  <div className="text-center">
                    No account?{" "}
                    <Link
                      className="text-decoration-none"
                      to={
                        redirectPath
                          ? `/register?redirect=${redirectPath}`
                          : "/register"
                      }>
                      Create one here
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <BackToTop />
    </section>
  );
}
