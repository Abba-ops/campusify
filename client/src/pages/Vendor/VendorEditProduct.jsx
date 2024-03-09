import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Placeholder,
  Row,
  Spinner,
} from "react-bootstrap";
import {
  useGetCategoriesQuery,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../features/productsApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function VendorEditProduct() {
  const [imageUrl, setImageUrl] = useState("");

  const { productId } = useParams();
  const { data: categories, isLoading: loadingCategories } =
    useGetCategoriesQuery();

  const {
    error,
    refetch,
    isLoading,
    data: product,
  } = useGetProductDetailsQuery(productId);

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
      toast.error(error?.data?.message || error.error);
    }
  };

  const [updateProduct, { isLoading: updatingProduct }] =
    useUpdateProductMutation();

  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    category: "",
    brand: "",
    price: 0,
    countInStock: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = { ...formData, productId, imageUrl };
    const result = await updateProduct(updatedProduct);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Updated product successfully");
      navigate("/vendor/dashboard/products");
    }
  };

  const renderPlaceholder = () => (
    <Placeholder as="div" animation="glow" className="placeholder-glow">
      <span className="placeholder col-12" style={{ height: "40px" }}></span>
      <span className="placeholder col-12" style={{ height: "20px" }}></span>
      <span className="placeholder col-10" style={{ height: "70px" }}></span>
      <span className="placeholder col-12" style={{ height: "20px" }}></span>
      <span className="placeholder col-8" style={{ height: "20px" }}></span>
      <span className="placeholder col-10" style={{ height: "15px" }}></span>
    </Placeholder>
  );

  return (
    <Card className="border-0 rounded-0">
      <Card.Body>
        {isLoading ? (
          <>
            {renderPlaceholder()}
            {renderPlaceholder()}
          </>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={6} className="mb-3">
                <Form.Group controlId="productName">
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
                    <img
                      src={imageUrl}
                      alt="Product"
                      className="img-fluid rounded mb-3"
                      style={{ maxWidth: "100%" }}
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

            <Row>
              <Col xs={12} md={6} className="mb-3">
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>

                  <Form.Select
                    name="category"
                    onChange={handleChange}
                    value={formData.category}>
                    {categories?.data.map((category) => (
                      <option value={category.name} key={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <Form.Group controlId="brand">
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
            </Row>

            <Row>
              <Col xs={12} md={6} className="mb-3">
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
              <Col xs={12} md={6} className="mb-3">
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

            <Button variant="dark" className="" type="submit">
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
  );
}
