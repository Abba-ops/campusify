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
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);

  const firstName = userInfo.data.otherNames.split(" ")[0];

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const toggleShowMenuDropdown = () => setShowMenuDropdown((prev) => !prev);

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
      <Dropdown align={"end"} show={showMenuDropdown}>
        <Nav.Link>
          <Image
            fluid
            roundedCircle
            loading="lazy"
            className="profile-picture-sm"
            onClick={toggleShowMenuDropdown}
            src={userInfo.data.profilePictureURL}
          />
        </Nav.Link>
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
