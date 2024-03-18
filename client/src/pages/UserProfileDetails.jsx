import React, { useState } from "react";
import {
  useDeleteMyAccountMutation,
  useUpdateUserPasswordMutation,
} from "../features/usersApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Spinner,
  Row,
  InputGroup,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteAccountModal from "../components/ConfirmDeletionModal";

export default function UserProfileDetails() {
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const { userInfo } = useSelector((state) => state.auth);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [updateUserPassword, { isLoading }] = useUpdateUserPasswordMutation();
  const [deleteMyAccount, { isLoading: isDeletingAccount }] =
    useDeleteMyAccountMutation();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
          error?.data?.message || "An error occurred while updating password."
        );
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteMyAccount();
      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(
        error?.data?.message || "An error occurred while deleting account."
      );
    }
  };

  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col lg={4} className="mb-5 mb-lg-0">
            <h4 className="text-uppercase text-center mb-4">
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
                {userInfo.data.vendor && userInfo.data.vendor.isApproved && (
                  <Badge bg="success">Approved</Badge>
                )}
                <p className="mb-1">{userInfo.data.email}</p>
                <p className="text-muted mb-0">
                  {userInfo.data.phoneNumber || "No phone number provided"}
                </p>
              </ListGroup.Item>
              {!userInfo.data.vendor && (
                <ListGroup.Item>
                  <div className="my-3">
                    Interested in becoming a vendor?{" "}
                    <Link
                      to={"/vendor-application"}
                      className="text-decoration-none">
                      Apply here
                    </Link>
                  </div>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="password">New Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        required
                        spellCheck={false}
                        value={password}
                        placeholder="Enter your new password"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Button
                        variant="secondary"
                        className="text-uppercase"
                        onClick={togglePasswordVisibility}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm your new password"
                      />
                      <Button
                        variant="secondary"
                        className="text-uppercase"
                        onClick={togglePasswordVisibility}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputGroup>
                  </Form.Group>
                  <div className="d-grid mb-3">
                    <Button
                      onClick={handleUpdatePassword}
                      className="text-uppercase"
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
              <ListGroup.Item className="py-3">
                <div className="d-grid">
                  <Button
                    onClick={handleShowDelete}
                    className="text-uppercase px-4 text-white"
                    variant="danger">
                    Delete Account
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={8}>
            <h4 className="text-uppercase text-center mb-4">Order History</h4>
          </Col>
        </Row>
      </Container>
      <DeleteAccountModal
        handleCloseDelete={handleCloseDelete}
        showDelete={showDelete}
        isDeletingAccount={isDeletingAccount}
        handleDeleteAccount={handleDeleteAccount}
      />
    </section>
  );
}
