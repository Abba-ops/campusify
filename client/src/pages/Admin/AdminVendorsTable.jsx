import React, { useState } from "react";
import { Button, ButtonGroup, Nav, Table } from "react-bootstrap";
import { useGetVendorsQuery } from "../../features/vendorApiSlice";
import TablePlaceholder from "../../components/TablePlaceholder";
import { Link } from "react-router-dom";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";

export default function AdminVendorsTable() {
  const { data: vendors, isLoading, isError } = useGetVendorsQuery();
  const [currentView, setCurrentView] = useState("all");

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
  };

  if (isLoading) {
    return (
      <>
        <TablePlaceholder />
        <TablePlaceholder />
        <TablePlaceholder />
        <TablePlaceholder />
        <TablePlaceholder />
      </>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <Nav variant="pills" defaultActiveKey="all">
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

      <Table size="lg" responsive bordered striped>
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
          {filteredVendors.map((vendor, index) => (
            <tr key={index}>
              <td>{vendor.businessName}</td>
              <td>{vendor.businessEmail}</td>
              <td>{vendor.businessPhone}</td>
              <td>{vendor.approvalStatus}</td>
              <td>{vendor.dateJoined}</td>
              <td>{vendor.averageRating}</td>
              <td>
                <ButtonGroup>
                  <Link to={`/admin/dashboard/vendors/${vendor._id}`}>
                    <Button variant="info" size="sm">
                      <BsEye />
                    </Button>
                  </Link>
                  <Link to={`/admin/dashboard/products/${vendor._id}/edit`}>
                    <Button variant="success" size="sm">
                      <BsPencil />
                    </Button>
                  </Link>
                  <Button variant="danger" size="sm">
                    <BsTrash />
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
