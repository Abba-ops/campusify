import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Image,
  Table,
  Modal,
  Dropdown,
  InputGroup,
  FormControl,
  Pagination,
} from "react-bootstrap";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import { useGetProductsQuery } from "../../features/productsApiSlice";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../../utils/cartUtils";
import Loader from "../../components/Loader";
import TablePlaceholder from "../../components/TablePlaceholder";

export default function AdminProductsTable() {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleDelete = (product) => {
    setShowDeleteModal(false);
  };

  const filteredProducts =
    products &&
    products.data.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts =
    filteredProducts &&
    filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="d-lg-flex justify-content-between align-items-center mb-3">
        <div>
          <h2>Product Management</h2>
          <p>
            View and manage product listings. Ensure accurate and up-to-date
            product information.
          </p>
        </div>
        <div className="d-flex align-items-center">
          <InputGroup>
            <FormControl
              placeholder="Search by product name"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>

      {isError ? (
        <p>Error fetching products. Please try again later.</p>
      ) : isLoading ? (
        <>
          <TablePlaceholder />
          <TablePlaceholder />
          <TablePlaceholder />
          <TablePlaceholder />
          <TablePlaceholder />
        </>
      ) : (
        <>
          {filteredProducts?.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <>
              <Table size="lg" responsive striped>
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
                  {currentProducts?.map((product) => (
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
                      <td className="text-center">
                        <Dropdown align="end">
                          <Dropdown.Toggle variant="dark" size="sm">
                            Actions
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              as={Link}
                              to={`/admin/dashboard/products/${product._id}`}>
                              <BsEye className="me-2" /> View
                            </Dropdown.Item>
                            <Dropdown.Item
                              as={Link}
                              to={`/admin/dashboard/products/${product._id}/edit`}>
                              <BsPencil className="me-2" /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                setSelectedProduct(product);
                                setShowDeleteModal(true);
                              }}>
                              <BsTrash className="me-2" /> Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
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
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          {selectedProduct && selectedProduct.productName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(selectedProduct)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
