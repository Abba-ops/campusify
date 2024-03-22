import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Image,
  Table,
  Pagination,
  InputGroup,
  FormControl,
  Breadcrumb,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import { useGetVendorProductsQuery } from "../../features/vendorApiSlice";
import TablePlaceholder from "../../components/TablePlaceholder";
import { numberWithCommas } from "../../utils/cartUtils";
import { useDeleteProductMutation } from "../../features/productsApiSlice";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

export default function VendorProductsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const {
    data: vendorProducts,
    isLoading,
    isError,
    refetch,
  } = useGetVendorProductsQuery();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const handleShowDeleteModal = (vendorId) => {
    setShowDeleteModal(true);
    setProductIdToDelete(vendorId);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProductIdToDelete(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = vendorProducts
    ? vendorProducts.data.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const [deleteProduct] = useDeleteProductMutation();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteProduct = async () => {
    try {
      const response = await deleteProduct(productIdToDelete).unwrap();
      if (response.success) {
        refetch();
        toast.success(response.message);
      }
    } catch (error) {
      toast.error((error && error.data.message) || "Failed to delete product");
    } finally {
      handleCloseDeleteModal();
    }
  };

  return (
    <>
      {isError ? (
        <div className="text-center mt-5">
          <h4 className="text-danger">Error Fetching Products</h4>
          <p className="mt-3">
            Sorry, we couldn't retrieve the products at the moment. Please try
            again later or contact support.
          </p>
        </div>
      ) : (
        <>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={"/vendor/dashboard/"}>Dashboard</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Products</Breadcrumb.Item>
          </Breadcrumb>
          <div className="d-lg-flex justify-content-between align-items-center">
            <div>
              <h2>Manage Your Products</h2>
              <p>
                Efficiently oversee your product listings. Keep your product
                information accurate and up-to-date with ease.
              </p>
            </div>
            <div>
              <Button
                as={Link}
                variant="dark"
                to={"/vendor/dashboard/products/create"}
                className="d-flex align-items-center mb-3 mb-lg-0 px-4">
                Create New Product
              </Button>
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
              <div className="mb-3">
                <InputGroup>
                  <FormControl
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Enter product name to search"
                  />
                </InputGroup>
              </div>
              {vendorProducts && vendorProducts.data.length === 0 ? (
                <div className="text-center mt-5">
                  <h4>No products found</h4>
                  <p>This vendor doesn't have any products yet.</p>
                </div>
              ) : (
                <>
                  {filteredProducts.length === 0 ? (
                    <div className="text-center mt-5">
                      <h4>No products found</h4>
                      <p>
                        There are no products matching your search criteria.
                      </p>
                    </div>
                  ) : (
                    <Table size="sm" responsive striped className="mb-3">
                      <thead>
                        <tr>
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
                              <Image
                                src={product.imageUrl}
                                width={50}
                                height={50}
                              />
                            </td>
                            <td>{product.category.name}</td>
                            <td>{product.brand}</td>
                            <td>&#8358;{numberWithCommas(product.price)}</td>
                            <td>
                              <ButtonGroup size="sm">
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip id="tooltip-view">View</Tooltip>
                                  }>
                                  <Button
                                    as={Link}
                                    to={`/vendor/dashboard/products/${product._id}`}
                                    variant="light">
                                    <BsEye />
                                  </Button>
                                </OverlayTrigger>

                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip id="tooltip-edit">Edit</Tooltip>
                                  }>
                                  <Button
                                    as={Link}
                                    to={`/vendor/dashboard/products/${product._id}/edit`}
                                    variant="light">
                                    <BsPencil />
                                  </Button>
                                </OverlayTrigger>

                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip id="tooltip-delete">
                                      Delete
                                    </Tooltip>
                                  }>
                                  <Button
                                    variant="light"
                                    onClick={() =>
                                      handleShowDeleteModal(product._id)
                                    }>
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
                      {[
                        ...Array(
                          Math.ceil(filteredProducts.length / itemsPerPage)
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
                </>
              )}
            </>
          )}
        </>
      )}
      <DeleteConfirmationModal
        headingText="Confirm Delete Product"
        bodyText="Are you sure you want to delete this product?"
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        onDelete={handleDeleteProduct}
        setShowModal={setShowDeleteModal}
        showModal={showDeleteModal}
      />
    </>
  );
}
