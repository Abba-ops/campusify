import React from "react";
import { Dropdown, Image, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function UserProfileDropdown({
  userInfo,
  isAdmin,
  isVendor,
  logoutHandler,
}) {
  const firstName = userInfo.data.otherNames.split(" ")[0];

  return (
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
        <Dropdown.Divider />
        <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
