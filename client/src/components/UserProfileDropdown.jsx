import React, { useState } from "react";
import { Dropdown, Image, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import DeleteAccountModal from "../components/ConfirmDeletionModal";
import { useDeleteMyAccountMutation } from "../features/usersApiSlice";
import { toast } from "react-toastify";

export default function UserProfileDropdown({
  userInfo,
  isAdmin,
  isVendor,
  logoutHandler,
  showDeleteOption,
}) {
  const [showDelete, setShowDelete] = useState(false);

  const firstName = userInfo.data.otherNames.split(" ")[0];

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const [deleteMyAccount, { isLoading: isDeletingAccount }] =
    useDeleteMyAccountMutation();

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteMyAccount().unwrap();
      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(
        (error && error.data.message) ||
          "An error occurred while deleting account."
      );
    }
  };

  return (
    <>
      <Dropdown align={"end"}>
        <Dropdown.Toggle variant="success" as={"span"}>
          <Image
            fluid
            roundedCircle
            loading="lazy"
            className="profile-picture-sm"
            src={userInfo.data.profilePictureURL}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Header>{firstName || "User"} Options</Dropdown.Header>
          <LinkContainer to="/profile">
            <Dropdown.Item>View Profile</Dropdown.Item>
          </LinkContainer>
          {isAdmin && (
            <Nav.Link>
              <LinkContainer to="/admin/dashboard/">
                <Dropdown.Item>Admin Dashboard</Dropdown.Item>
              </LinkContainer>
            </Nav.Link>
          )}
          {isVendor && (
            <Nav.Link>
              <LinkContainer to="/vendor/dashboard/">
                <Dropdown.Item>Vendor Dashboard</Dropdown.Item>
              </LinkContainer>
            </Nav.Link>
          )}
          {showDeleteOption && (
            <Dropdown.Item onClick={handleShowDelete}>
              Delete Account
            </Dropdown.Item>
          )}
          <Dropdown.Divider />
          <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <DeleteAccountModal
        handleCloseDelete={handleCloseDelete}
        showDelete={showDelete}
        isDeletingAccount={isDeletingAccount}
        handleDeleteAccount={handleDeleteAccount}
      />
    </>
  );
}
