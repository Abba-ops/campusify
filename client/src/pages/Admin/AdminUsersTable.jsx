import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Image,
  Table,
  Pagination,
  InputGroup,
  FormControl,
  OverlayTrigger,
  Tooltip,
  Breadcrumb,
} from "react-bootstrap";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../features/usersApiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BsEye, BsTrash } from "react-icons/bs";
import TablePlaceholder from "../../components/TablePlaceholder";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

export default function AdminUsersTable() {
  const { data: users, isLoading, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const handleShowDeleteModal = (userId) => {
    setShowDeleteModal(true);
    setUserIdToDelete(userId);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setUserIdToDelete(null);
  };

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser(userIdToDelete).unwrap();
      if (response.success) {
        refetch();
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(
        (error && error.data.message) ||
          "An error occurred while deleting the user."
      );
    } finally {
      handleCloseDeleteModal();
    }
  };

  const filteredUsers =
    users?.data?.filter(
      (user) =>
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.otherNames.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/admin/dashboard/"}>Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Users</Breadcrumb.Item>
      </Breadcrumb>
      <div className="d-lg-flex justify-content-between align-items-center mb-3">
        <div>
          <h2>User Management</h2>
          <p>
            Explore and manage user accounts to ensure a secure and organized
            user experience.
          </p>
        </div>
        <div className="d-flex align-items-center">
          <InputGroup>
            <FormControl
              aria-label="Search"
              value={searchTerm}
              placeholder="Search by name or email"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>

      {isLoading ? (
        <>
          {[...Array(5)].map((_, index) => (
            <TablePlaceholder key={index} />
          ))}
        </>
      ) : (
        <>
          {currentUsers.length === 0 ? (
            <div className="text-center">
              <h4>No Users Found</h4>
              <p>
                Apologies, but we couldn't find any users matching your search
                criteria at the moment.
              </p>
            </div>
          ) : (
            <>
              <Table size="sm" responsive striped>
                <thead>
                  <tr>
                    <th>Last Name</th>
                    <th>Other Names</th>
                    <th>Email</th>
                    <th>Picture</th>
                    <th>Phone Number</th>
                    <th>Vendor</th>
                    <th>User Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user.lastName}</td>
                      <td>{user.otherNames}</td>
                      <td>{user.email}</td>
                      <td>
                        <Image
                          fluid
                          roundedCircle
                          loading="lazy"
                          src={user.profilePictureURL}
                          className="profile-picture-sm"
                          alt={`${user.lastName} ${user.otherNames}`}
                        />
                      </td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.isVendor ? "Yes" : "No"}</td>
                      <td>{user.userType}</td>
                      <td>
                        <ButtonGroup size="sm">
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-view">View</Tooltip>}>
                            <Button
                              as={Link}
                              to={`/admin/dashboard/users/${user._id}`}
                              variant="light">
                              <BsEye />
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="tooltip-delete">Delete</Tooltip>
                            }>
                            <Button
                              variant="light"
                              onClick={() => handleShowDeleteModal(user._id)}
                              disabled={isDeleting}>
                              <BsTrash />
                            </Button>
                          </OverlayTrigger>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

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
      <DeleteConfirmationModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        headingText="Delete User"
        bodyText="Are you sure you want to delete this user?"
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteUser}
      />
    </>
  );
}
