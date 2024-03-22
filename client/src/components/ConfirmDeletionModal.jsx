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
      toast.error((error && error.data.message) || "An error occurred.");
    }
  };

  return (
    <Modal show={showDelete} onHide={handleCloseDelete} centered>
      <Modal.Body>
        <Modal.Title className="mb-3 text-uppercase">
          Confirm Account Deletion
        </Modal.Title>
        <p>
          By confirming account deletion, you will permanently erase all your
          data, including profile information, order history, and preferences.
          This action is irreversible, so please be absolutely sure before
          proceeding.
        </p>
        <Alert variant="warning" className="border-0 rounded-0">
          <strong>Warning:</strong> This action cannot be undone. Please make
          sure you want to proceed.
        </Alert>
      </Modal.Body>

      <Modal.Footer>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              To confirm, type{" "}
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
          className="text-white text-uppercase"
          onClick={handleCloseDelete}>
          Cancel
        </Button>
        <Button
          type="button"
          variant="dark"
          onClick={deleteAccount}
          className="text-uppercase"
          disabled={confirmDeleteAccount !== "delete my account"}>
          {isDeletingAccount ? (
            <Spinner size="sm" animation="border">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            "Delete Account"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
