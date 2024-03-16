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
import { useGetVendorProductsQuery } from "../../features/vendorApiSlice";
import TablePlaceholder from "../../components/TablePlaceholder";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../../utils/cartUtils";

export default function VendorProductsTable() {
  const {
    data: vendorProducts,
    isLoading,
    isError,
    error,
  } = useGetVendorProductsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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

  console.log(vendorProducts);
  console.log("error", error && error);

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
                <small>
                  View and manage product listings. Ensure accurate and
                  up-to-date product information.
                </small>
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
                    placeholder="Search by product name"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </InputGroup>
              </div>
              <Table size="sm" responsive striped>
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Image</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Stock Count</th>
                    <th>Average Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.productName}</td>
                      <td>
                        <Image src={product.imageUrl} width={50} />
                      </td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>&#8358;{numberWithCommas(product.price)}</td>
                      <td>{product.countInStock}</td>
                      <td>{product.rating}</td>
                      <td>
                        <ButtonGroup>
                          <Link
                            to={`/vendor/dashboard/products/${product._id}`}>
                            <Button variant="info" size="sm">
                              <BsEye />
                            </Button>
                          </Link>
                          <Link
                            to={`/vendor/dashboard/products/${product._id}/edit`}>
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
              <div className="d-flex justify-content-center">
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
