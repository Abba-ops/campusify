import { Button, ButtonGroup, Image, Table } from "react-bootstrap";
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

  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-3">
        <div>
          <h2>User Management</h2>
          <p>
            <small>
              View and manage user accounts. Ensure a secure and organized user
              experience.
            </small>
          </p>
        </div>
        <div></div>
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
        <Table size="sm" responsive striped>
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
          <tbody>
            {users.data.map((user) => (
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
                      onClick={handleDeleteUser}>
                      <BsTrash />
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
