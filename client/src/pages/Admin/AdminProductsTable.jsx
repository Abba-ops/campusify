import React, { useState } from "react";
import {
  Button,
  Image,
  Table,
  InputGroup,
  FormControl,
  Pagination,
  Badge,
  Form,
  Card,
  Col,
  Row,
  Breadcrumb,
  OverlayTrigger,
  Tooltip,
  ButtonGroup,
} from "react-bootstrap";
import { BsEye, BsTrash } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
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
      <div className="d-lg-flex justify-content-between align-items-center mb-3">
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
          <TablePlaceholder />
          <TablePlaceholder />
          <TablePlaceholder />
          <TablePlaceholder />
          <TablePlaceholder />
        </>
      ) : (
        <>
          {filteredProducts?.length === 0 ? (
            <div className="text-center mt-5">
              <h4>No Products Found</h4>
              <p className="mt-3">
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
              <div className="d-flex justify-content-center mt-3">
                <Pagination>
                  {Array.from(
                    {
                      length: Math.ceil(filteredProducts.length / itemsPerPage),
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
            </>
          )}
        </>
      )}
      <div className="mt-5">
        <div>
          <h3 className="mb-3">Manage Categories</h3>
          <p className="mb-4">
            Organize and oversee your categories efficiently to streamline
            navigation and enhance user experience.
          </p>
        </div>
        <Row>
          <Col lg={3}>
            <Form onSubmit={handleAddCategory}>
              <InputGroup className="mb-3">
                <FormControl
                  value={newCategory}
                  placeholder="Enter New Category"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="outline-dark"
                  className="text-uppercase">
                  Add
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <Row className="mb-5">
          {categories &&
            categories.data.map((category) => (
              <Col
                key={category._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-3">
                <Card className="border-0 rounded-0 shadow-sm mb-3">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{category.name}</h5>
                    <Link onClick={() => handleRemoveCategory(category._id)}>
                      <MdDelete />
                    </Link>
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
                              <Link
                                onClick={() =>
                                  handleRemoveSubcategory(
                                    category._id,
                                    subcat._id
                                  )
                                }>
                                <MdDelete />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </Card.Body>
                    )}
                </Card>
              </Col>
            ))}
        </Row>
        <Row>
          <Col lg={3}>
            <div>
              <h5 className="mb-3">Add New Subcategory</h5>
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
                <InputGroup className="mb-3">
                  <FormControl
                    value={newSubcategory}
                    placeholder="New Subcategory"
                    onChange={(e) => setNewSubcategory(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="outline-dark"
                    className="text-uppercase">
                    Add
                  </Button>
                </InputGroup>
              </Form>
            </div>
          </Col>
        </Row>
        {categories && categories.data.length === 0 && (
          <Badge variant="primary" className="mt-2">
            No categories available
          </Badge>
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
