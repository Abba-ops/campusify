import React, { useEffect, useState } from "react";
import { useUpdateUserPasswordMutation } from "../features/usersApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
  Badge,
  Spinner,
} from "react-bootstrap";
import MetaTags from "../components/MetaTags";

export default function UserProfileDetails() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const { userInfo } = useSelector((state) => state.auth);
  const [updateUserPassword, { isLoading }] = useUpdateUserPasswordMutation();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const response = await updateUserPassword({ password }).unwrap();
        if (response.success) {
          toast.success(response.message);
        }
      } catch (error) {
        toast.error(
          (error && error.data.message) ||
            "An error occurred while updating password."
        );
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-5">
      <MetaTags
        title="User Profile - Campusify"
        description="Manage your account details and order history on Campusify."
        keywords="user profile, account information, order history, Campusify"
      />
      <Container>
        <Row>
          <Col lg={4} className="mb-5 mb-lg-0">
            <h4 className="text-uppercase text-center mb-3">
              Account Information
            </h4>
            <ListGroup>
              <ListGroup.Item className="text-center">
                <div className="d-flex justify-content-center my-3">
                  <Image
                    fluid
                    roundedCircle
                    loading="lazy"
                    className="profile-picture-lg border"
                    src={userInfo.data.profilePictureURL}
                  />
                </div>
                <h4 className="mb-2">{`${userInfo.data.otherNames} ${userInfo.data.lastName}`}</h4>
                <p className="mb-1">{userInfo.data.email}</p>
                {userInfo.data.vendor && userInfo.data.vendor.isApproved && (
                  <Badge bg="success">Approved</Badge>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Form>
                  <Form.Group className="mb-3 text-center text-lg-start">
                    <Form.Label htmlFor="password">New Password</Form.Label>
                    <Form.Control
                      required
                      spellCheck={false}
                      value={password}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 text-center text-lg-start">
                    <Form.Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Form.Label>
                    <Form.Control
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Show Password"
                      checked={showPassword}
                      onChange={togglePasswordVisibility}
                    />
                  </Form.Group>
                  <div className="mb-3 d-flex justify-content-center">
                    <Button
                      onClick={handleUpdatePassword}
                      className="text-uppercase px-4"
                      variant="dark">
                      {isLoading ? (
                        <Spinner size="sm" animation="border" />
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </div>
                </Form>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={8}>
            <h4 className="text-uppercase text-center mb-3">Order History</h4>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
