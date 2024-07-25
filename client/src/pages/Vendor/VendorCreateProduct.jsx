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
} from "../../features/productsApiSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function VendorCreateProduct() {
  const [subcategories, setSubcategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const {
    data: categories,
    isLoading: loadingCategories,
    isError: errorCategories,
  } = useGetCategoriesQuery();
  const [createProduct, { isLoading }] = useCreateProductMutation();

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
    const form = new FormData();
    form.append("productName", formData?.productName);
    form.append("productDescription", formData?.productDescription);
    form.append("category", formData?.category);
    form.append("brand", formData?.brand);
    form.append("price", formData?.price);
    form.append("countInStock", formData?.countInStock);
    form.append("subcategory", JSON.stringify(formData?.subcategory));
    form.append("productImage", imageFile);

    try {
      const result = await createProduct(form).unwrap();
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

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      const category = categories?.data?.find((c) => c._id === value);
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
      const subcategory = subcategories?.find((c) => c._id === value);
      setFormData({
        ...formData,
        [name]: {
          name: subcategory?.name,
          _id: subcategory?._id,
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
      const category = categories?.data?.find(
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
                    value={formData?.productName}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                    maxLength={100}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formFile">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    required
                    type="file"
                    onChange={handleImageChange}
                    className="mb-3"
                  />
                  {imageFile && (
                    <div className="image-container">
                      <Image
                        fluid
                        loading="lazy"
                        src={URL.createObjectURL(imageFile)}
                        className="product-image"
                      />
                    </div>
                  )}
                </Form.Group>
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
                    value={formData?.productDescription}
                    placeholder="Enter product description"
                    maxLength={500}
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
                        <option value={category?._id} key={category?._id}>
                          {category?.name}
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
                        <option value={subcategory?._id} key={subcategory?._id}>
                          {subcategory?.name}
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
                    value={formData?.brand}
                    onChange={handleChange}
                    placeholder="Enter brand name"
                    maxLength={50}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="price">
                  <Form.Label>Price (&#8358;)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData?.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                    min={0}
                    step="0.01"
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
                    value={formData?.countInStock}
                    onChange={handleChange}
                    placeholder="Enter stock count"
                    required
                    min={0}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button
              variant="dark"
              type="submit"
              className="px-4"
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
