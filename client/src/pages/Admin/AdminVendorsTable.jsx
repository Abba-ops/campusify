import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Nav,
  Table,
  Pagination,
  OverlayTrigger,
  Tooltip,
  Breadcrumb,
  Image,
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vendorIdToDelete, setVendorIdToDelete] = useState(null);
  const [currentView, setCurrentView] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const { data: vendors, isLoading, isError, refetch } = useGetVendorsQuery();

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
            (vendor) => vendor?.approvalStatus === "pending"
          ) || []
        );
      case "approved":
        return (
          vendors?.data?.filter(
            (vendor) => vendor?.approvalStatus === "approved"
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
      if (response?.success) {
        refetch();
        toast.success(response?.message);
      }
    } catch (error) {
      toast.error(
        (error && error?.data?.message) ||
          "An error occurred while deleting the vendor."
      );
    } finally {
      handleCloseDeleteModal();
    }
  };

  const vendorTableHeadings = [
    "Vendor Name",
    "Vendor Email",
    "Sales Count",
    "Vendor Phone",
    "Approval Status",
    "Date Joined",
    "Vendor Logo",
    "Actions",
  ];

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
        <p>
          Here you can find information about managing our vendors effectively.
        </p>
      </div>
      <Nav variant="pills" defaultActiveKey="all" className="my-4">
        <Nav.Item>
          <Nav.Link eventKey="all" onClick={() => handleNavItemClick("all")}>
            All
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
        <TablePlaceholder
          headers={vendorTableHeadings}
          rowCount={itemsPerPage}
        />
      ) : isError ? (
        <div className="text-center mt-5">
          <h5 className="text-danger">Oops! Failed to retrieve vendor data</h5>
          <p className="mt-3">
            We're sorry, but we encountered an issue while fetching the vendor
            data. Please ensure you're connected to the internet and try again
            later.
          </p>
        </div>
      ) : (
        <>
          {currentVendors?.length === 0 ? (
            <div className="text-center mt-5">
              <h5>No Vendors Found</h5>
              <p>
                Sorry, but we couldn't find any vendors that match your search
                criteria right now.
              </p>
            </div>
          ) : (
            <Table striped responsive size="sm">
              <thead>
                <tr>
                  {vendorTableHeadings.map((heading, index) => (
                    <th key={index}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentVendors?.map((vendor) => (
                  <tr key={vendor?._id}>
                    <td>{vendor?.vendorName}</td>
                    <td>{vendor?.vendorEmail}</td>
                    <td>{vendor?.salesCount}</td>
                    <td>{vendor?.vendorPhone}</td>
                    <td className="text-capitalize">
                      {vendor?.approvalStatus}
                    </td>
                    <td>
                      {format(new Date(vendor?.dateJoined), "dd/MM/yyyy")}
                    </td>
                    <td>
                      <Image
                        fluid
                        roundedCircle
                        loading="lazy"
                        src={vendor?.vendorLogo}
                        className="profile-picture-sm"
                      />
                    </td>
                    <td>
                      <ButtonGroup size="sm">
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip id="tooltip-view">View</Tooltip>}>
                          <Button
                            as={Link}
                            to={`/admin/dashboard/vendors/${vendor?._id}`}
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
                            onClick={() => handleShowDeleteModal(vendor?._id)}>
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
          {filteredVendors?.length > itemsPerPage && (
            <div className="d-flex justify-content-center">
              <Pagination>
                {[
                  ...Array(Math.ceil(filteredVendors.length / itemsPerPage)),
                ].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => paginate(index + 1)}
                    className="pagination-item">
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          )}
        </>
      )}
      <DeleteConfirmationModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        headingText="Delete Vendor"
        bodyText="Are you sure you want to delete this vendor? This action cannot be undone."
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteVendor}
      />
    </>
  );
}
