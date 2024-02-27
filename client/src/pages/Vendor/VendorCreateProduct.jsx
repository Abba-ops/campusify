import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../features/productsApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function VendorCreateProduct() {
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    category: "",
    brand: "",
    price: 0,
    countInStock: 0,
  });

  const [createProduct, { isLoading }] = useCreateProductMutation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createProduct({ ...formData, imageUrl });
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product updated successfully");
            navigate("/vendor/dashboard/products");

    }
  };

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      console.log(res.image);
      setImageUrl(res.image);
      toast.success(res.message || "uploadFileHandler");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={12}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="productName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" onChange={uploadFileHandler} />
                </Form.Group>

                <Form.Group controlId="productDescription">
                  <Form.Label>Product Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group controlId="category">
                      <Form.Label>Category</Form.Label>
                      <Form.Select name="category" onChange={handleChange}>
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="brand">
                      <Form.Label>Brand</Form.Label>
                      <Form.Control
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId="price">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="countInStock">
                      <Form.Label>Count In Stock</Form.Label>
                      <Form.Control
                        type="number"
                        name="countInStock"
                        value={formData.countInStock}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" type="submit">
                  Create Product
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
