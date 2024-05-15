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
  useCreateProductMutation,
  useGetCategoriesQuery,
  useUploadProductImageMutation,
} from "../../features/productsApiSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function VendorCreateProduct() {
  const [subcategories, setSubcategories] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const {
    data: categories,
    isLoading: loadingCategories,
    isError: errorCategories,
  } = useGetCategoriesQuery();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [uploadProductImage, { isLoading: loadingImageUpload }] =
    useUploadProductImageMutation();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createProduct({ ...formData, imageUrl }).unwrap();
      if (result?.success) {
        toast.success(result?.message);
        navigate("/vendor/dashboard/products");
      }
    } catch (error) {
      toast.error(
        (error && error?.data?.message) || "Failed to create product"
      );
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("productImage", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      setImageUrl(res?.image);
      toast.success(res?.message || "Image uploaded successfully");
    } catch (error) {
      toast.error((error && error?.data?.message) || "Failed to upload image");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      const category = categories?.data.find((c) => c._id === value);
      setSubcategories(category ? category?.subcategories : []);
      const subcategory = category?.subcategories[0];
      setFormData((prev) => ({
        ...prev,
        category: category?._id,
        subcategory: {
          _id: subcategory?._id,
          name: subcategory?.name,
        },
      }));
    } else if (name === "subcategory") {
      const subcategory = subcategories.find((c) => c._id === value);
      setFormData({
        ...formData,
        [name]: {
          name: subcategory.name,
          _id: subcategory._id,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (!loadingCategories) {
      const category = categories?.data.find(
        (c) => c._id === categories?.data[0]._id
      );
      setSubcategories(category ? category?.subcategories : []);
      const subcategory = category?.subcategories[0];
      setFormData((prev) => ({
        ...prev,
        category: category?._id,
        subcategory: {
          _id: subcategory?._id,
          name: subcategory?.name,
        },
      }));
    }
  }, [loadingCategories, categories]);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/vendor/dashboard/"}>Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={"/vendor/dashboard/products"}>Products</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Create Product</Breadcrumb.Item>
      </Breadcrumb>
      <Card className="border-0 rounded-0 shadow-sm">
        <Card.Body>
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
                    required
                    type="file"
                    onChange={uploadFileHandler}
                    className="mb-3"
                  />
                  {imageUrl && (
                    <div className="image-container">
                      <Image
                        fluid
                        loading="lazy"
                        src={imageUrl}
                        className="product-image"
                      />
                    </div>
                  )}
                </Form.Group>
                {loadingImageUpload && <div>Uploading image...</div>}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group controlId="productDescription">
                  <Form.Label>Product Description</Form.Label>
                  <Form.Control
                    rows={3}
                    required
                    as="textarea"
                    onChange={handleChange}
                    name="productDescription"
                    value={formData.productDescription}
                    placeholder="Enter product description"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="category" className="mb-3 mb-lg-0">
                  <Form.Label>Category</Form.Label>
                  <Form.Select required name="category" onChange={handleChange}>
                    {errorCategories ? (
                      <option value="">Error: Retry</option>
                    ) : loadingCategories ? (
                      <option value="">Loading...</option>
                    ) : (
                      categories &&
                      categories?.data.map((category) => (
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
                    onChange={handleChange}>
                    {loadingCategories ? (
                      <option value="">Loading...</option>
                    ) : errorCategories ? (
                      <option value="">Error: Retry</option>
                    ) : (
                      subcategories?.map((subcategory) => (
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
                    required
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Enter brand name"
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
              className="text-uppercase px-4 fw-semibold"
              disabled={isLoading}>
              {isLoading ? (
                <Spinner size="sm" animation="border" />
              ) : (
                "Create Product"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
