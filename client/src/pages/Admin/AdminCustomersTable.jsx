import React, { useState } from "react";
import { useGetAllVendorCustomersQuery } from "../../features/vendorApiSlice";
import { Breadcrumb, Image, Table, Pagination } from "react-bootstrap";
import TablePlaceholder from "../../components/TablePlaceholder";
import { Link } from "react-router-dom";

export default function AdminCustomersTable() {
  const {
    data: customers,
    isLoading,
    isError,
  } = useGetAllVendorCustomersQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers =
    customers?.data.slice(indexOfFirstCustomer, indexOfLastCustomer) || [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/admin/dashboard/"}>Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Customers</Breadcrumb.Item>
      </Breadcrumb>

      <div>
        <h2>Customer Management</h2>
        <p>
          Explore and manage customer accounts to ensure a secure and organized
          user experience.
        </p>
      </div>

      {isError ? (
        <div className="text-center mt-5">
          <h4 className="text-danger">Error Loading Customers Data</h4>
          <p className="mt-3">
            Failed to load customers data. Please try again later.
          </p>
        </div>
      ) : isLoading ? (
        <>
          {[...Array(5)].map((_, index) => (
            <TablePlaceholder key={index} />
          ))}
        </>
      ) : customers && customers.data.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No Customers Found</h4>
          <p>There are currently no customers to display.</p>
        </div>
      ) : (
        <>
          <Table size="sm" responsive striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>Last Name</th>
                <th>Other Names</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Profile Picture</th>
                <th>Account Creation Date</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer._id}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.otherNames}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phoneNumber}</td>
                  <td>
                    <Image
                      fluid
                      roundedCircle
                      loading="lazy"
                      className="profile-picture-sm"
                      src={customer.profilePictureURL}
                      alt={`${customer.lastName} ${customer.otherNames}`}
                    />
                  </td>
                  <td>
                    {new Date(
                      customer.accountCreationDate
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {customers &&
            customers.data &&
            customers.data.length > customersPerPage && (
              <div className="d-flex justify-content-center">
                <Pagination>
                  {[
                    ...Array(
                      Math.ceil(customers?.data.length / customersPerPage)
                    ),
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
            )}
        </>
      )}
    </>
  );
}
