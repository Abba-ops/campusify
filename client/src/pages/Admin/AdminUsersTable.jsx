import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Image,
  Table,
  Pagination,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../features/usersApiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BsEye, BsTrash } from "react-icons/bs";
import Loader from "../../components/Loader";
import TablePlaceholder from "../../components/TablePlaceholder";

export default function AdminUsersTable() {
  const { data: users, isLoading, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId).unwrap();
        refetch();
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  // Filter users based on search term
  const filteredUsers =
    users?.data?.filter(
      (user) =>
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.otherNames.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="d-lg-flex justify-content-between align-items-center mb-3">
        <div>
          <h2>User Management</h2>
          <p>
            <small>
              View and manage user accounts. Ensure a secure and organized user
              experience.
            </small>
          </p>
        </div>
        <div className="d-flex align-items-center">
          <InputGroup>
            <FormControl
              placeholder="Search by name or email"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>

      {isLoading ? (
        <>
          <TablePlaceholder />
          <TablePlaceholder />
          <TablePlaceholder />
          <TablePlaceholder />
          <TablePlaceholder />
        </>
      ) : (
        <>
          {currentUsers.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <>
              <Table size="lg" responsive striped>
                {/* Table header */}
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Profile Picture</th>
                    <th>Full Name</th>
                    <th>Email Address</th>
                    <th>Admin Status</th>
                    <th>Vendor Status</th>
                    <th>User Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>
                        <Image
                          fluid
                          roundedCircle
                          loading="lazy"
                          src={user.profilePictureURL}
                          className="profile-picture-sm"
                        />
                      </td>
                      <td>
                        {user.lastName} {user.otherNames}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? "Yes" : "No"}</td>
                      <td>{user.isVendor ? "Yes" : "No"}</td>
                      <td>{user.userType}</td>
                      <td>
                        <ButtonGroup>
                          <Link to={`/admin/dashboard/users/${user._id}`}>
                            <Button variant="info" size="sm">
                              <BsEye />
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDeleteUser(user._id)}
                            disabled={isDeleting}>
                            <BsTrash />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* Pagination */}
              <div className="d-flex justify-content-center">
                <Pagination>
                  {[
                    ...Array(Math.ceil(filteredUsers.length / itemsPerPage)),
                  ].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => paginate(index + 1)}>
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
