import React, { useState } from "react";
import {
  useDeleteMyAccountMutation,
  useUpdatePasswordMutation,
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
} from "react-bootstrap";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import DeleteAccountModal from "../components/ConfirmDeletionModal";

export default function MyProfileDetails() {
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const { userInfo } = useSelector((state) => state.auth);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const [deleteMyAccount, { isLoading: isDeletingAccount }] =
    useDeleteMyAccountMutation();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        await updatePassword({ password });
        toast.success("Password updated successfully");
      } catch (error) {
        toast.error(error && (error.data.message || error.error));
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteMyAccount();
      toast.success("Account deleted successfully");
    } catch (error) {
      toast.error(error && (error.data.message || error.error));
    }
  };

  return (
    <section className="bg-white py-5">
      <Container>
        <Row>
          <Col lg={4} className="mb-5 mb-lg-0">
            <h4 className="text-uppercase text-center mb-3">
              Personal Information
            </h4>
            <ListGroup>
              <ListGroup.Item>
                <div className="d-flex justify-content-center my-3">
                  <Image
                    fluid
                    roundedCircle
                    loading="lazy"
                    className="profile-picture-lg border"
                    src={userInfo.data.profilePictureURL}
                  />
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-center">
                <h2 className="mb-1">
                  {`${userInfo.data.otherNames} ${userInfo.data.lastName}`}
                </h2>
                <p className="mb-0">{userInfo.data.email}</p>
                <p className="text-muted">
                  {userInfo.data.phoneNumber || "No phone number provided"}
                </p>
              </ListGroup.Item>
              <ListGroup.Item className="text-center">
                <div className="my-3">
                  Interested in becoming a vendor?{" "}
                  <Link
                    to={"/vendor-application"}
                    className="text-decoration-none">
                    Apply here
                  </Link>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="password">
                      Create a Password
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="confirmPassword">
                      Confirm Password
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        id="confirmPassword"
                      />
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
                    variant="primary">
                    Delete Account
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={8}>
            <h4 className="text-uppercase text-center mb-3">Order History</h4>
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
