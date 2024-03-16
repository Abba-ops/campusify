import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import {
  useCreateProductMutation,
  useGetCategoriesQuery,
  useUploadProductImageMutation,
} from "../../features/productsApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function VendorCreateProduct() {
  const [imageUrl, setImageUrl] = useState("");
  const { data: categories, isLoading: loadingCategories } =
    useGetCategoriesQuery();
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

  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createProduct({ ...formData, imageUrl });

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product created successfully");
      navigate("/vendor/dashboard/products");
    }
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      const category = categories.data.find((c) => c._id === value);
      setSubcategories(category ? category.subcategories : []);
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

  useEffect(() => {
    if (!loadingCategories) {
      const category = categories.data.find(
        (c) => c._id === categories.data[0]._id
      );
      setSubcategories(category ? category.subcategories : []);
    }
  }, [loadingCategories, setSubcategories, categories]);

  console.log(formData);

  return (
    <>
      <Card className="border-0 rounded-0">
        <Card.Body>
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
                  <Form.Select name="category" onChange={handleChange}>
                    {categories?.data.map((category) => (
                      <option value={category._id} key={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <Form.Group controlId="subcategory">
                  <Form.Label>Subcategories</Form.Label>
                  <Form.Select name="subcategory" onChange={handleChange}>
                    {subcategories?.map((subcategory) => (
                      <option value={subcategory._id} key={subcategory._id}>
                        {subcategory.name}
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

            <Button
              variant="dark"
              className=""
              type="submit"
              disabled={isLoading || !imageUrl}>
              {isLoading ? (
                <Spinner size="sm" animation="border">
                  <span className="visually-hidden"></span>
                </Spinner>
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
