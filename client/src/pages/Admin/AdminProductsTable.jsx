import React, { useState } from "react";
import { RiAddLine, RiDeleteBinLine } from "react-icons/ri";
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
  Badge,
  Form,
  ListGroup,
  Card,
  Col,
  Row,
  Container,
} from "react-bootstrap";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../../features/productsApiSlice";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../../utils/cartUtils";
import Loader from "../../components/Loader";
import TablePlaceholder from "../../components/TablePlaceholder";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

export default function AdminProductsTable() {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const {
    data: categories,
    isLoading: loadingCategories,
    refetch,
  } = useGetCategoriesQuery();

  console.log("data", categories);

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

  const [addCategory, { isLoading: addingCategory }] = useAddCategoryMutation();
  const [deleteCategory, { isLoading: deletingCategory }] =
    useDeleteCategoryMutation();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await addCategory({ name: newCategory }).unwrap();
      if (res.success) {
        refetch();
        setNewCategory("");
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRemoveCategory = async (categoryId) => {
    try {
      const res = await deleteCategory(categoryId).unwrap();
      if (res.success) {
        refetch();
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
      <Container className="mt-4">
        <h3>Manage Categories</h3>

        <Form onSubmit={handleAddCategory}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="New Category"
              aria-label="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button type="submit" variant="primary">
              <RiAddLine /> Add
            </Button>
          </InputGroup>
        </Form>

        <Row>
          {categories?.data.map((category) => (
            <Col
              key={category._id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-3">
              <Card className="border-0 rounded-0">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <span>{category.name}</span>
                  <h4>
                    <MdDelete
                      onClick={() => handleRemoveCategory(category._id)}
                    />
                  </h4>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {categories?.data.length === 0 && (
          <Badge variant="info" className="mt-2">
            No categories available
          </Badge>
        )}
      </Container>
    </>
  );
}
