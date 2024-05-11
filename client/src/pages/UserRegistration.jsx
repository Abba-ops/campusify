import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  Spinner,
  Stack,
  Card,
  InputGroup,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { setCredentials } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterUserMutation } from "../features/usersApiSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MetaTags from "../components/MetaTags";
import BackToTop from "../components/BackToTop";

export default function UserRegistration() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToConditions, setAgreeToConditions] = useState(false);
  const [userType, setUserType] = useState("student");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const redirectPath = new URLSearchParams(search).get("redirect") || "/";

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser({
        password,
        uniqueId: identifier,
        userType,
      }).unwrap();

      if (response.success) {
        dispatch(setCredentials({ ...response }));
        toast.success(response.message);
        navigate(redirectPath);
      }
    } catch (error) {
      toast.error((error && error.data.message) || "Registration failed.");
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
        title="Create Account - Campusify"
        description="Sign up and create a new account on Campusify to access the ultimate campus marketplace."
        keywords="Campusify, sign up, register, campus marketplace"
      />
      <Container>
        <h5 className="border-bottom pb-3 text-uppercase text-center">
          Create a New Account
        </h5>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="my-3 py-3">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <div className="text-center mb-3">
                    Already have an account?{" "}
                    <Link className="text-decoration-none" to="/login">
                      Log in instead!
                    </Link>
                  </div>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      User Type
                    </Form.Label>
                    <Col sm={6} className="d-flex justify-content-center">
                      <Stack direction="horizontal" gap={3}>
                        <Form.Check
                          required
                          type="radio"
                          name="userType"
                          label="Student"
                          onChange={() => setUserType("student")}
                        />
                        <Form.Check
                          required
                          type="radio"
                          label="Staff"
                          name="userType"
                          onChange={() => setUserType("staff")}
                        />
                      </Stack>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label
                      sm={3}
                      column
                      className="text-center text-lg-start">
                      {userType === "student"
                        ? "Matriculation Number"
                        : "Staff Email"}
                    </Form.Label>
                    <Col sm={6}>
                      <Form.Control
                        required
                        type="text"
                        value={identifier}
                        spellCheck={false}
                        onChange={(e) =>
                          setIdentifier(
                            userType === "student"
                              ? e.target.value.toUpperCase()
                              : e.target.value.toLowerCase()
                          )
                        }
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
                  <Form.Group className="my-4 d-flex justify-content-center">
                    <Form.Check
                      required
                      type="checkbox"
                      checked={agreeToConditions}
                      label="Agree to terms and conditions"
                      onChange={(e) => setAgreeToConditions(e.target.checked)}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-end my-3">
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
                        "Create Account"
                      )}
                    </Button>
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
