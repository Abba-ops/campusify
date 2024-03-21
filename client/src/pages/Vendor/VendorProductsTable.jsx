import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Image,
  Table,
  Pagination,
  InputGroup,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { useGetVendorProductsQuery } from "../../features/vendorApiSlice";
import TablePlaceholder from "../../components/TablePlaceholder";
import { BsEye, BsPencil, BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../../utils/cartUtils";

export default function VendorProductsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: vendorProducts,
    isLoading,
    isError,
  } = useGetVendorProductsQuery();

  const itemsPerPage = 5;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredProducts =
    vendorProducts &&
    vendorProducts.data.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts =
    filteredProducts &&
    filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {isError ? (
        <div>Error fetching data</div>
      ) : (
        <>
          <div className="d-lg-flex justify-content-between align-items-center">
            <div>
              <h2>Product Management</h2>
              <p>
                View and manage product listings. Ensure accurate and up-to-date
                product information.
              </p>
            </div>
            <div>
              <Link to={"/vendor/dashboard/products/create"}>
                <Button variant="dark">Create Product</Button>
              </Link>
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
              <div className="mb-3">
                <InputGroup>
                  <FormControl
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Enter product name to search"
                  />
                </InputGroup>
              </div>
              <Table size="lg" responsive striped>
                <thead>
                  <tr className="text-uppercase">
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Image</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>
                        {product.productName.length > 30
                          ? `${product.productName.slice(0, 30)}...`
                          : product.productName}
                      </td>
                      <td>
                        <Image src={product.imageUrl} width={50} />
                      </td>
                      <td>{product.category.name}</td>
                      <td>{product.brand}</td>
                      <td>&#8358;{numberWithCommas(product.price)}</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle variant="link" id="dropdown-basic">
                            <BsThreeDotsVertical size={20} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              as={Link}
                              to={`/vendor/dashboard/products/${product._id}`}
                              className="custom-dropdown-item">
                              <BsEye className="me-2" /> View
                            </Dropdown.Item>
                            <Dropdown.Item
                              as={Link}
                              to={`/vendor/dashboard/products/${product._id}/edit`}
                              className="custom-dropdown-item">
                              <BsPencil className="me-2" /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item">
                              <BsTrash className="me-2" /> Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-flex justify-content-center mt-3">
                <Pagination>
                  {[
                    ...Array(Math.ceil(filteredProducts.length / itemsPerPage)),
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
