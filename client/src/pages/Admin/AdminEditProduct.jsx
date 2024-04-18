import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import {
  useGetCategoriesQuery,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../features/productsApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TablePlaceholder from "../../components/TablePlaceholder";

export default function AdminEditProduct() {
  const [imageUrl, setImageUrl] = useState("");

  const { productId } = useParams();
  const {
    data: categories,
    isLoading: loadingCategories,
    isError: errorCategories,
  } = useGetCategoriesQuery();
  const navigate = useNavigate();

  const [subcategories, setSubcategories] = useState([]);

  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    category: "",
    brand: "",
    price: 0,
    countInStock: 0,
    subcategory: {
      _id: "",
      name: "",
    },
  });

  const { isLoading, data: product } = useGetProductDetailsQuery(productId);

  const [uploadProductImage] = useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.data.productName,
        productDescription: product.data.productDescription,
        category: product.data.category,
        brand: product.data.brand,
        price: product.data.price,
        countInStock: product.data.countInStock,
        subcategory: product.data.subcategory,
      });
      setImageUrl(product.data.imageUrl);
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      setImageUrl(res.image);
      toast.success(res.message || "Image uploaded successfully");
    } catch (error) {
      toast.error((error && error.data.message) || "Failed to upload image");
    }
  };

  const [updateProduct, { isLoading: updatingProduct }] =
    useUpdateProductMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      const category = categories.data.find((c) => c._id === value);
      setSubcategories(category ? category.subcategories : []);
      const subcategory = category.subcategories[0];
      setFormData((prev) => ({
        ...prev,
        category: category._id,
        subcategory: {
          _id: subcategory._id,
          name: subcategory.name,
        },
      }));
      return;
    } else if (name === "subcategory") {
      const subcategory = subcategories.find((c) => c._id === value);
      setFormData({
        ...formData,
        [name]: {
          name: subcategory.name,
          _id: subcategory._id,
        },
      });
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedProduct = { ...formData, productId, imageUrl };
      const result = await updateProduct(updatedProduct).unwrap();

      if (result.success) {
        toast.success(result.message);
        navigate("/admin/dashboard/products");
      }
    } catch (error) {
      toast.error((error && error.data.message) || "Failed to update product");
    }
  };

  useEffect(() => {
    if (!loadingCategories && product) {
      const category = categories.data.find(
        (c) => c._id === product.data.category._id
      );
      setSubcategories(category ? category.subcategories : []);
    }
  }, [loadingCategories, product, setSubcategories, categories]);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/admin/dashboard/"}>Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={"/admin/dashboard/products"}>Products</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Edit Product</Breadcrumb.Item>
      </Breadcrumb>
      <Card className="border-0 rounded-0 shadow-sm">
        <Card.Body>
          {isLoading ? (
            <>
              <TablePlaceholder />
              <TablePlaceholder />
              <TablePlaceholder />
              <TablePlaceholder />
              <TablePlaceholder />
              <TablePlaceholder />
            </>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col xs={12} md={6}>
                  <Form.Group controlId="productName" className="mb-3 mb-lg-0">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleChange}
                      placeholder="Enter product name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="formFile">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={uploadFileHandler}
                      className="mb-3"
                    />
                    {imageUrl && (
                      <Image
                        fluid
                        rounded
                        src={imageUrl}
                        alt="Product"
                        className="mb-3"
                      />
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Group controlId="productDescription">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="productDescription"
                      value={formData.productDescription}
                      onChange={handleChange}
                      placeholder="Enter product description"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12} md={6}>
                  <Form.Group controlId="category" className="mb-3 mb-lg-0">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      required
                      name="category"
                      onChange={handleChange}
                      value={formData.category._id}>
                      {errorCategories ? (
                        <option value="">Error: Retry</option>
                      ) : loadingCategories ? (
                        <option value="">Loading...</option>
                      ) : (
                        categories &&
                        categories.data.map((category) => (
                          <option value={category._id} key={category._id}>
                            {category.name}
                          </option>
                        ))
                      )}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="subcategory">
                    <Form.Label>Subcategories</Form.Label>
                    <Form.Select
                      required
                      name="subcategory"
                      onChange={handleChange}
                      value={formData.subcategory._id}>
                      {errorCategories ? (
                        <option value="">Error: Retry</option>
                      ) : loadingCategories ? (
                        <option value="">Loading...</option>
                      ) : (
                        subcategories &&
                        subcategories.map((subcategory) => (
                          <option value={subcategory._id} key={subcategory._id}>
                            {subcategory.name}
                          </option>
                        ))
                      )}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12} md={6}>
                  <Form.Group controlId="brand" className="mb-3 mb-lg-0">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="Enter brand name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="price">
                    <Form.Label>Price (&#8358;)</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12} md={6}>
                  <Form.Group controlId="countInStock">
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control
                      type="number"
                      name="countInStock"
                      value={formData.countInStock}
                      onChange={handleChange}
                      placeholder="Enter stock count"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                variant="dark"
                type="submit"
                className="text-uppercase px-4 fw-semibold">
                {updatingProduct ? (
                  <Spinner size="sm" animation="border">
                    <span className="visually-hidden"></span>
                  </Spinner>
                ) : (
                  "Update Product"
                )}
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
