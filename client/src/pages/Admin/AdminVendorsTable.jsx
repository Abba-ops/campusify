import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Nav,
  Table,
  Pagination,
  OverlayTrigger,
  Tooltip,
  Breadcrumb,
} from "react-bootstrap";
import {
  useDeleteVendorMutation,
  useGetVendorsQuery,
} from "../../features/vendorApiSlice";
import TablePlaceholder from "../../components/TablePlaceholder";
import { Link } from "react-router-dom";
import { BsEye, BsTrash } from "react-icons/bs";
import { format } from "date-fns";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

export default function VendorManagementPage() {
  const { data: vendors, isLoading, isError, refetch } = useGetVendorsQuery();
  const [currentView, setCurrentView] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vendorIdToDelete, setVendorIdToDelete] = useState(null);

  const handleShowDeleteModal = (vendorId) => {
    setShowDeleteModal(true);
    setVendorIdToDelete(vendorId);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setVendorIdToDelete(null);
  };

  const [deleteVendor] = useDeleteVendorMutation();

  const filterVendors = () => {
    switch (currentView) {
      case "pending":
        return (
          vendors?.data?.filter(
            (vendor) => vendor.approvalStatus === "pending"
          ) || []
        );
      case "approved":
        return (
          vendors?.data?.filter(
            (vendor) => vendor.approvalStatus === "approved"
          ) || []
        );
      default:
        return vendors?.data || [];
    }
  };

  const filteredVendors = filterVendors();

  const handleNavItemClick = (view) => {
    setCurrentView(view);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVendors = filteredVendors.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteVendor = async () => {
    try {
      const response = await deleteVendor(vendorIdToDelete).unwrap();
      if (response.success) {
        refetch();
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(
        (error && error.data.message) ||
          "An error occurred while deleting the vendor."
      );
    } finally {
      handleCloseDeleteModal();
    }
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/admin/dashboard/"}>Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Vendors</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <h2>Vendor Management</h2>
        <p>Manage vendors efficiently with the options below:</p>
      </div>

      <Nav variant="pills" defaultActiveKey="all" className="my-4">
        <Nav.Item>
          <Nav.Link eventKey="all" onClick={() => handleNavItemClick("all")}>
            All Vendors
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="pending"
            onClick={() => handleNavItemClick("pending")}>
            Pending
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="approved"
            onClick={() => handleNavItemClick("approved")}>
            Approved
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {isLoading ? (
        <>
          <TablePlaceholder />
          <TablePlaceholder />
          <TablePlaceholder />
          <TablePlaceholder />
        </>
      ) : isError ? (
        <div className="text-center mt-5">
          <h4 className="text-danger">Oops! Failed to retrieve vendor data</h4>
          <p className="mt-3">
            We're sorry, but we encountered an issue while fetching the vendor
            data. Please ensure you're connected to the internet and try again
            later.
          </p>
        </div>
      ) : (
        <>
          {currentVendors.length === 0 ? (
            <div className="text-center">
              <h4>No Vendors Found</h4>
              <p>
                Sorry, but we couldn't find any vendors that match your search
                criteria right now.
              </p>
            </div>
          ) : (
            <Table striped responsive size="sm">
              <thead>
                <tr>
                  <th>Vendor Name</th>
                  <th>Vendor Email</th>
                  <th>Sales Count</th>
                  <th>Vendor Phone</th>
                  <th>Creator Name</th>
                  <th>Approval Status</th>
                  <th>Date Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentVendors.map((vendor) => (
                  <tr key={vendor._id}>
                    <td>{vendor.vendorName}</td>
                    <td>{vendor.vendorEmail}</td>
                    <td>{vendor.salesCount}</td>
                    <td>{vendor.vendorPhone}</td>
                    <td>{`${vendor.user.lastName} ${vendor.user.otherNames}`}</td>
                    <td className="text-capitalize">{vendor.approvalStatus}</td>
                    <td>{format(new Date(vendor.dateJoined), "dd/MM/yyyy")}</td>
                    <td>
                      <ButtonGroup size="sm">
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip id="tooltip-view">View</Tooltip>}>
                          <Button
                            as={Link}
                            to={`/admin/dashboard/vendors/${vendor._id}`}
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
                            onClick={() => handleShowDeleteModal(vendor._id)}>
                            <BsTrash />
                          </Button>
                        </OverlayTrigger>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <div className="d-flex justify-content-center">
            <Pagination>
              {[...Array(Math.ceil(filteredVendors.length / itemsPerPage))].map(
                (_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => paginate(index + 1)}
                    className="pagination-item">
                    {index + 1}
                  </Pagination.Item>
                )
              )}
            </Pagination>
          </div>
        </>
      )}
      <DeleteConfirmationModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        headingText="Delete Vendor"
        bodyText="Are you sure you want to delete this vendor?"
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteVendor}
      />
    </>
  );
}
