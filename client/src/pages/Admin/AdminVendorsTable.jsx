import React, { useState } from "react";
import { Button, ButtonGroup, Nav, Table, Pagination } from "react-bootstrap";
import { useGetVendorsQuery } from "../../features/vendorApiSlice";
import TablePlaceholder from "../../components/TablePlaceholder";
import { Link } from "react-router-dom";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";

export default function VendorManagementPage() {
  const { data: vendors, isLoading, isError } = useGetVendorsQuery();
  const [currentView, setCurrentView] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
    setCurrentPage(1); // Reset to the first page when changing view
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVendors = filteredVendors.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h2>Vendor Management</h2>

      <Nav variant="pills" defaultActiveKey="all" className="my-4">
        <Nav.Item>
          <Nav.Link
            eventKey="all"
            onClick={() => handleNavItemClick("all")}
            className="nav-link-custom">
            All Vendors
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="pending"
            onClick={() => handleNavItemClick("pending")}
            className="nav-link-custom">
            Pending
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="approved"
            onClick={() => handleNavItemClick("approved")}
            className="nav-link-custom">
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
        <div className="text-danger">Error fetching data</div>
      ) : (
        <>
          {currentVendors.length === 0 ? (
            <p>No vendors found.</p>
          ) : (
            <>
              <Table size="lg" striped responsive>
                <thead>
                  <tr>
                    <th>Vendor Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Approval Status</th>
                    <th>Date Joined</th>
                    <th>Average Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentVendors.map((vendor, index) => (
                    <tr key={index}>
                      <td>{vendor.vendorName}</td>
                      <td>{vendor.vendorEmail}</td>
                      <td>{vendor.vendorPhone}</td>
                      <td>{vendor.approvalStatus}</td>
                      <td>{vendor.dateJoined}</td>
                      <td>{vendor.averageRating}</td>
                      <td>
                        <ButtonGroup>
                          <Link
                            to={`/admin/dashboard/vendors/${vendor._id}`}
                            className="btn btn-info btn-sm">
                            <BsEye />
                          </Link>
                          <Link
                            to={`/admin/dashboard/vendors/${vendor._id}/edit`}
                            className="btn btn-success btn-sm">
                            <BsPencil />
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            className="btn-trash">
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
            </>
          )}
        </>
      )}
    </>
  );
}
