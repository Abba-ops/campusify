import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Placeholder,
  Row,
} from "react-bootstrap";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../features/productsApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function VendorEditProduct() {
  const { productId } = useParams();

  const {
    error,
    refetch,
    isLoading,
    data: product,
  } = useGetProductDetailsQuery(productId);

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.data.productName,
        imageUrl: product.data.imageUrl,
        productDescription: product.data.productDescription,
        category: product.data.category,
        brand: product.data.brand,
        price: product.data.price,
        countInStock: product.data.countInStock,
      });
    }
  }, [product]);

  const [updateProduct, { isLoading: updatingProduct }] =
    useUpdateProductMutation();

  const [formData, setFormData] = useState({
    productName: "",
    imageUrl: "",
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
    // Here you can send formData to your backend to create the product
    const updatedProduct = { ...formData, productId };
    const result = await updateProduct(updatedProduct);
    if (result.error) {
      toast.error(result.error);
    } else {
      setFormData({
        productName: "",
        imageUrl: "",
        productDescription: "",
        category: "",
        brand: "",
        price: 0,
        countInStock: 0,
      });
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
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={12}>
          <Card>
            <Card.Body>
              {isLoading ? (
                <>
                  {renderPlaceholder()}
                  {renderPlaceholder()}
                </>
              ) : (
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
                    <Form.Control type="file" />
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
                        <Form.Select aria-label="Default select example">
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
                    Update Product
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
