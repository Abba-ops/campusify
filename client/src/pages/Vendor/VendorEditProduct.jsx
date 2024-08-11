import { useEffect, useState } from "react";
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
} from "../../features/productsApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormLoadingPlaceholder from "../../components/FormLoadingPlaceholder";
import { FaEdit } from "react-icons/fa";

export default function VendorEditProduct() {
  const [imageFile, setImageFile] = useState(null);

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

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product?.data?.productName,
        productDescription: product?.data?.productDescription,
        category: product?.data?.category,
        brand: product?.data?.brand,
        price: product?.data?.price,
        countInStock: product?.data?.countInStock,
        subcategory: product?.data?.subcategory,
      });
      setImageFile(product?.data?.imageFile);
    }
  }, [product]);

  const [updateProduct, { isLoading: updatingProduct }] =
    useUpdateProductMutation();

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
      return;
    } else if (name === "subcategory") {
      const subcategory = subcategories?.find((c) => c._id === value);
      setFormData({
        ...formData,
        [name]: {
          name: subcategory?.name,
          _id: subcategory?._id,
        },
      });
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("productId", productId);

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    Object.keys(formData).forEach((key) => {
      if (key === "category") {
        formDataToSend.append("category", formData[key]?._id);
      } else if (key === "subcategory") {
        formDataToSend.append("subcategory", JSON.stringify(formData[key]));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const result = await updateProduct({
        productId,
        formData: formDataToSend,
      }).unwrap();

      if (result?.success) {
        toast.success(result?.message);
        navigate("/vendor/dashboard/products");
      }
    } catch (error) {
      toast.error(
        (error && error?.data?.message) || "Failed to update product"
      );
    }
  };

  useEffect(() => {
    if (!loadingCategories && product) {
      const category = categories?.data.find(
        (c) => c._id === product?.data?.category?._id
      );
      setSubcategories(category ? category?.subcategories : []);
    }
  }, [loadingCategories, product, setSubcategories, categories]);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/vendor/dashboard/"}>Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={"/vendor/dashboard/products"}>Products</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Edit Product</Breadcrumb.Item>
      </Breadcrumb>
      <Card className="shadow-sm">
        <Card.Body>
          {isLoading ? (
            <FormLoadingPlaceholder />
          ) : (
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col xs={12} md={6}>
                  <Form.Group controlId="productName" className="mb-3 mb-lg-0">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="productName"
                      value={formData?.productName}
                      onChange={handleChange}
                      placeholder="Enter product name"
                      maxLength={100}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="formFile">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleFileChange}
                      className="mb-3"
                    />
                    {imageFile && (
                      <div className="image-container">
                        <Image
                          fluid
                          loading="lazy"
                          src={URL.createObjectURL(imageFile)}
                          className="product-image mb-3"
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
                    <Form.Select
                      required
                      name="category"
                      onChange={handleChange}
                      value={formData?.category?._id}>
                      {errorCategories ? (
                        <option value="">Error: Retry</option>
                      ) : loadingCategories ? (
                        <option value="">Loading...</option>
                      ) : (
                        categories &&
                        categories?.data?.map((category) => (
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
                      onChange={handleChange}
                      value={formData?.subcategory?._id}>
                      {errorCategories ? (
                        <option value="">Error: Retry</option>
                      ) : loadingCategories ? (
                        <option value="">Loading...</option>
                      ) : (
                        subcategories &&
                        subcategories?.map((subcategory) => (
                          <option
                            value={subcategory?._id}
                            key={subcategory?._id}>
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
                      required
                      name="price"
                      type="number"
                      value={formData?.price}
                      onChange={handleChange}
                      placeholder="Enter price"
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
                      required
                      type="number"
                      name="countInStock"
                      onChange={handleChange}
                      value={formData?.countInStock}
                      placeholder="Enter stock count"
                      min={0}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="dark" type="submit" className="px-4">
                {updatingProduct ? (
                  <Spinner size="sm" animation="border">
                    <span className="visually-hidden"></span>
                  </Spinner>
                ) : (
                  <>
                    <FaEdit className="me-2" />
                    Update Product
                  </>
                )}
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
