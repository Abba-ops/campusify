import React, { useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { useLogoutUserMutation } from "../features/usersApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../features/authSlice";

export default function ConfirmDeletionModal({
  showDelete,
  isDeletingAccount,
  handleCloseDelete,
  handleDeleteAccount,
}) {
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState("");
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteAccount = async () => {
    try {
      handleDeleteAccount();
      handleCloseDelete();
      await logoutUser().unwrap();
      dispatch(clearCredentials());
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <Modal show={showDelete} onHide={handleCloseDelete} centered>
      <Modal.Body>
        <Modal.Title className="mb-3">Confirm Account Deletion</Modal.Title>
        <p className="text-muted">
          Confirming account deletion will permanently erase all your data,
          including profile information, order history, and preferences. This
          action is irreversible. Please be certain before proceeding.
        </p>
        <Alert className="border-0">
          <strong>Warning:</strong> This action is not reversible. Please be
          certain.
        </Alert>
      </Modal.Body>
      <Modal.Footer className="d-block">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              To verify, type{" "}
              <strong className="user-select-all">delete my account</strong>{" "}
              below:
            </Form.Label>
            <Form.Control
              type="text"
              spellCheck={false}
              className="rounded-0"
              value={confirmDeleteAccount.toLowerCase()}
              onChange={(e) => setConfirmDeleteAccount(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Footer>
      <Modal.Footer>
        <Button
          variant="primary"
          className="text-white text-uppercase rounded-0"
          onClick={handleCloseDelete}
          type="button">
          Close
        </Button>
        <Button
          type="button"
          variant="dark"
          onClick={deleteAccount}
          className="text-uppercase rounded-0"
          disabled={confirmDeleteAccount !== "delete my account"}>
          {isDeletingAccount ? (
            <Spinner size="sm" animation="border">
              <span className="visually-hidden"></span>
            </Spinner>
          ) : (
            "Continue"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
