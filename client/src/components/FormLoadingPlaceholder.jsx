import { Form, Row, Col, Spinner, Placeholder, Button } from "react-bootstrap";

export default function FormLoadingPlaceholder() {
  return (
    <Form>
      <Row className="mb-3">
        <Col xs={12} md={6}>
          <Form.Group controlId="productName" className="mb-3 mb-lg-0">
            <Form.Label>Product Name</Form.Label>
            <Placeholder animation="glow">
              <Placeholder as={Form.Control} xs={12} />
            </Placeholder>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="formFile">
            <Form.Label>Upload Image</Form.Label>
            <Placeholder animation="glow">
              <Placeholder as={Form.Control} xs={12} />
            </Placeholder>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12}>
          <Form.Group controlId="productDescription">
            <Form.Label>Product Description</Form.Label>
            <Placeholder animation="glow">
              <Placeholder as={Form.Control} xs={12} />
              <Placeholder as={Form.Control} xs={12} />
              <Placeholder as={Form.Control} xs={6} />
            </Placeholder>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} md={6}>
          <Form.Group controlId="category" className="mb-3 mb-lg-0">
            <Form.Label>Category</Form.Label>
            <Placeholder animation="glow">
              <Placeholder as={Form.Select} xs={12} />
            </Placeholder>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="subcategory">
            <Form.Label>Subcategories</Form.Label>
            <Placeholder animation="glow">
              <Placeholder as={Form.Select} xs={12} />
            </Placeholder>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} md={6}>
          <Form.Group controlId="brand" className="mb-3 mb-lg-0">
            <Form.Label>Brand</Form.Label>
            <Placeholder animation="glow">
              <Placeholder as={Form.Control} xs={12} />
            </Placeholder>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="price">
            <Form.Label>Price (&#8358;)</Form.Label>
            <Placeholder animation="glow">
              <Placeholder as={Form.Control} xs={12} />
            </Placeholder>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} md={6}>
          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Placeholder animation="glow">
              <Placeholder as={Form.Control} xs={12} />
            </Placeholder>
          </Form.Group>
        </Col>
      </Row>

      <Button variant="dark" className="px-4" disabled>
        <Spinner
          size="sm"
          animation="border"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden">Loading...</span>
      </Button>
    </Form>
  );
}
