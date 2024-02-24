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
  FloatingLabel,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteAccountModal from "../components/ConfirmDeletionModal";

export default function PersonalInfo() {
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
    } else {
      try {
        await updatePassword({ password });
        toast.success("Password updated successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteMyAccount();
      toast.success("Account deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <section className="bg-white py-5">
      <Container className="position-relative">
        <Row>
          <Col lg={4} className="mb-5 mb-lg-0">
            <h5 className="text-uppercase text-center">Personal Information</h5>
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
              <ListGroup.Item>
                <FloatingLabel label="Full Name" className="mb-3">
                  <Form.Control
                    readOnly
                    type="text"
                    className="border-0"
                    value={`${userInfo.data.lastName} ${userInfo.data.otherNames}`}
                  />
                </FloatingLabel>
                <FloatingLabel label="Email address" className="mb-3">
                  <Form.Control
                    readOnly
                    type="email"
                    className="border-0"
                    value={userInfo.data.email}
                  />
                </FloatingLabel>
                <FloatingLabel label="Phone Number">
                  <Form.Control
                    readOnly
                    type="text"
                    className="border-0"
                    value={userInfo.data.phoneNumber}
                  />
                </FloatingLabel>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="my-0 my-lg-3">
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
                  <Form.Group className="my-3">
                    <Form.Label htmlFor="password">
                      Create a Password
                    </Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        value={password}
                        className="rounded-0"
                        onChange={(e) => setPassword(e.target.value)}
                        type={"password"}
                        id="password"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="my-3">
                    <Form.Label htmlFor="confirmPassword">
                      Confirm Password
                    </Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        value={confirmPassword}
                        className="rounded-0"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type={"password"}
                        id="confirmPassword"
                      />
                    </InputGroup>
                  </Form.Group>
                  <div className="d-flex justify-content-center mb-3">
                    <Button
                      disabled={
                        isLoading ||
                        password.length === 0 ||
                        confirmPassword.length === 0
                      }
                      onClick={handleUpdatePassword}
                      className="text-uppercase rounded-0 px-4"
                      variant="dark">
                      {isLoading ? (
                        <Spinner size="sm" animation="border">
                          <span className="visually-hidden"></span>
                        </Spinner>
                      ) : (
                        "Update password"
                      )}
                    </Button>
                  </div>
                </Form>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex justify-content-center my-3">
                  <Button
                    onClick={handleShowDelete}
                    className="text-uppercase rounded-0 text-white"
                    variant="dark">
                    Delete Account
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={8}>
            <h5 className="text-uppercase text-center">Order History</h5>
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
