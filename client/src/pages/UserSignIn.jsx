import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../features/authSlice";
import { toast } from "react-toastify";
import { useLoginMutation } from "../features/usersApiSlice";
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

export default function UserSignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success(`Welcome back, ${res.data.lastName}!`);
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, redirect, navigate]);

  return (
    <section className="bg-white py-5">
      <Container>
        <h5 className="border-bottom pb-3 text-uppercase text-center">
          Log In to Your Account
        </h5>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="my-3 py-3">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
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
                          className="text-uppercase"
                          onClick={handleShowPassword}>
                          Show
                        </Button>
                      </InputGroup>
                    </Col>
                  </Form.Group>
                  <div className="text-center">
                    <Link className="text-decoration-none">
                      Forgot your password?
                    </Link>
                  </div>
                  <div className="d-flex justify-content-center my-3 border-bottom pb-3">
                    <Button
                      type="submit"
                      variant="dark"
                      disabled={isLoading}
                      className="text-uppercase px-4">
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
                    <Link
                      className="text-decoration-none"
                      to={
                        redirect
                          ? `/register?redirect=${redirect}`
                          : "/register"
                      }>
                      No account? Create one here
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
