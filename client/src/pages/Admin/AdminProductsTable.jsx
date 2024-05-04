import React, { useState } from "react";
import {
  Button,
  Image,
  Table,
  InputGroup,
  FormControl,
  Pagination,
  Form,
  Card,
  Col,
  Row,
  Breadcrumb,
  OverlayTrigger,
  Tooltip,
  ButtonGroup,
} from "react-bootstrap";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import {
  useAddCategoryMutation,
  useAddSubcategoryMutation,
  useDeleteCategoryMutation,
  useDeleteProductMutation,
  useDeleteSubcategoryMutation,
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../../features/productsApiSlice";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../../utils/cartUtils";
import TablePlaceholder from "../../components/TablePlaceholder";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

export default function AdminProductsTable() {
  const {
    data: products,
    isLoading,
    isError,
    refetch: refetchProducts,
  } = useGetProductsQuery();
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newCategory, setNewCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: categories, refetch } = useGetCategoriesQuery();
  const [deleteSubcategory] = useDeleteSubcategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [addSubcategory] = useAddSubcategoryMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [addCategory] = useAddCategoryMutation();

  const handleShowDeleteModal = (vendorId) => {
    setShowDeleteModal(true);
    setProductIdToDelete(vendorId);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProductIdToDelete(null);
  };

  const itemsPerPage = 5;

  const filteredProducts =
    products &&
    products.data.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts =
    filteredProducts &&
    filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      toast.error((error && error.data.message) || "Failed to add category");
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
      toast.error((error && error.data.message) || "Failed to remove category");
    }
  };

  const handleAddSubcategory = async (e) => {
    e.preventDefault();

    try {
      const res = await addSubcategory({
        name: newSubcategory,
        parentCategory: selectedCategory,
      }).unwrap();

      if (res.success) {
        refetch();
        setNewSubcategory("");
        toast.success(res.message);
      }
    } catch (error) {
      toast.error((error && error.data.message) || "Failed to add subcategory");
    }
  };

  const handleRemoveSubcategory = async (categoryId, subcategoryId) => {
    try {
      const res = await deleteSubcategory({
        subcategoryId,
        categoryId,
      }).unwrap();
      if (res.success) {
        refetch();
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(
        (error && error.data.message) || "Failed to remove subcategory"
      );
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const response = await deleteProduct(productIdToDelete).unwrap();
      if (response.success) {
        refetchProducts();
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
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/admin/dashboard/"}>Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Products</Breadcrumb.Item>
      </Breadcrumb>
      <div className="d-lg-flex justify-content-between align-items-center mb-3 mb-lg-0">
        <div>
          <h2>Product Management</h2>
          <p>
            Explore and manage your product listings to ensure accurate and
            up-to-date information for your customers.
          </p>
        </div>
        <div className="d-flex align-items-center">
          <InputGroup>
            <FormControl
              value={searchTerm}
              aria-label="Search"
              placeholder="Search by product name"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>
      {isError ? (
        <div className="text-center mt-5">
          <h4 className="text-danger">Error Fetching Products</h4>
          <p className="mt-3">
            Sorry, we couldn't retrieve the products at the moment. Please try
            again later or contact support.
          </p>
        </div>
      ) : isLoading ? (
        <>
          {[...Array(5)].map((_, index) => (
            <TablePlaceholder key={index} />
          ))}
        </>
      ) : (
        <>
          {filteredProducts?.length === 0 ? (
            <div className="text-center mt-5">
              <h4>No Products Found</h4>
              <p>
                Apologies, but we couldn't find any products matching your
                search criteria at the moment.
              </p>
            </div>
          ) : (
            <>
              <Table size="sm" responsive striped>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Image</th>
                    <th>Category</th>
                    <th>Subcategory</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Count In Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr key={product._id}>
                      <td>
                        {product.productName.length > 30
                          ? `${product.productName.slice(0, 30)}...`
                          : product.productName}
                      </td>
                      <td>
                        <Image
                          src={product.imageUrl}
                          className="profile-picture-sm"
                        />
                      </td>
                      <td>{product.category.name}</td>
                      <td>{product.subcategory.name}</td>
                      <td>{product.brand}</td>
                      <td>&#8358;{numberWithCommas(product.price)}</td>
                      <td>{product.countInStock}</td>
                      <td>
                        <ButtonGroup size="sm">
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-view">View</Tooltip>}>
                            <Button
                              as={Link}
                              to={`/admin/dashboard/products/${product._id}`}
                              variant="light">
                              <BsEye />
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-edit">Edit</Tooltip>}>
                            <Button
                              as={Link}
                              to={`/admin/dashboard/products/${product._id}/edit`}
                              variant="light">
                              <BsPencil />
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="tooltip-delete">Delete</Tooltip>
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
              {filteredProducts.length > itemsPerPage && (
                <div className="d-flex justify-content-center">
                  <Pagination>
                    {Array.from(
                      {
                        length: Math.ceil(
                          filteredProducts.length / itemsPerPage
                        ),
                      },
                      (_, i) => (
                        <Pagination.Item
                          key={i + 1}
                          active={i + 1 === currentPage}
                          onClick={() => paginate(i + 1)}>
                          {i + 1}
                        </Pagination.Item>
                      )
                    )}
                  </Pagination>
                </div>
              )}
            </>
          )}
        </>
      )}
      <div className="mt-5">
        <div className="mb-3">
          <h2>Category Management</h2>
          <p>
            Efficiently organize and oversee your categories to streamline
            navigation and enhance user experience.
          </p>
        </div>
        <Row className="mb-4">
          <Col lg={4}>
            <Card className="border-0 rounded-0 py-3 shadow-sm">
              <Card.Body>
                <Form onSubmit={handleAddCategory}>
                  <InputGroup>
                    <FormControl
                      value={newCategory}
                      placeholder="Enter New Category"
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <Button
                      type="submit"
                      variant="dark"
                      disabled={newCategory.length === 0}
                      className="text-uppercase fw-semibold">
                      Add
                    </Button>
                  </InputGroup>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-4">
          {categories &&
            categories.data.map((category) => (
              <Col
                key={category._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-3">
                <Card className="border-0 rounded-0 mb-3 shadow-sm">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{category.name}</h5>
                    <Button
                      size="sm"
                      variant="light"
                      onClick={() => handleRemoveCategory(category._id)}>
                      <BsTrash />
                    </Button>
                  </Card.Body>
                  {category.subcategories &&
                    category.subcategories.length > 0 && (
                      <Card.Body>
                        <ul className="list-unstyled">
                          {category.subcategories.map((subcat) => (
                            <li
                              key={subcat._id}
                              className="d-flex justify-content-between align-items-center">
                              <span>{subcat.name}</span>
                              <Button
                                size="sm"
                                variant="light"
                                onClick={() =>
                                  handleRemoveSubcategory(
                                    category._id,
                                    subcat._id
                                  )
                                }>
                                <BsTrash />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </Card.Body>
                    )}
                </Card>
              </Col>
            ))}
        </Row>
        <div>
          <h5 className="mb-3">Create New Subcategory</h5>
          <p>
            Add a new subcategory to further organize your products and improve
            navigation for your customers.
          </p>
        </div>
        <Row>
          <Col lg={4}>
            <div>
              <Card className="border-0 rounded-0 py-3 shadow-sm">
                <Card.Body>
                  <Form onSubmit={handleAddSubcategory}>
                    <Form.Select
                      className="mb-3"
                      onChange={(e) => setSelectedCategory(e.target.value)}>
                      {categories &&
                        categories.data.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                    </Form.Select>
                    <InputGroup>
                      <FormControl
                        value={newSubcategory}
                        placeholder="New Subcategory"
                        onChange={(e) => setNewSubcategory(e.target.value)}
                      />
                      <Button
                        type="submit"
                        variant="dark"
                        disabled={newSubcategory.length === 0}
                        className="text-uppercase fw-semibold">
                        Add
                      </Button>
                    </InputGroup>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
        {categories && categories.data.length === 0 && (
          <div className="text-center mt-5">
            <h4>No categories found</h4>
            <p>There are currently no categories available.</p>
          </div>
        )}
      </div>
      <DeleteConfirmationModal
        headingText="Confirm Delete"
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
