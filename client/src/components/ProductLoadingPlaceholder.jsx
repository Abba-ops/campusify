import {
  Row,
  Col,
  Card,
  ListGroup,
  Placeholder,
  Button,
  Image,
} from "react-bootstrap";
import { MdDelete } from "react-icons/md";

export default function ProductLoadingPlaceholder() {
  return (
    <>
      <Row>
        <Col md={4} className="mb-4 mb-lg-0">
          <Card className="shadow-sm">
            <Card.Body>
              <div className="image-container">
                <Image
                  fluid
                  loading="lazy"
                  className="product-image placeholder"
                />
              </div>
            </Card.Body>
          </Card>
          <ListGroup variant="flush" className="mt-4">
            {[...Array(3)].map((_, index) => (
              <ListGroup.Item key={index} className="mb-3 p-3 shadow-sm">
                <div className="d-flex align-items-center mb-3">
                  <Placeholder
                    as="div"
                    animation="glow"
                    className="flex-shrink-0 me-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}>
                    <Placeholder xs={12} />
                  </Placeholder>
                  <div>
                    <Placeholder as="h6" animation="glow" className="mb-1">
                      <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder
                      as="small"
                      animation="glow"
                      className="text-muted">
                      <Placeholder xs={8} />
                    </Placeholder>
                  </div>
                </div>
                <Placeholder as="div" animation="glow" className="mb-3">
                  <Placeholder xs={8} />
                </Placeholder>
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={12} />
                </Placeholder>
                <Button
                  variant="link"
                  className="position-absolute top-0 end-0"
                  disabled>
                  <MdDelete size={24} />
                </Button>
              </ListGroup.Item>
            ))}
            <div className="d-flex justify-content-center">
              <Placeholder.Button
                variant="dark"
                className="my-4 px-4"
                xs={6}
                animation="glow"
                disabled
              />
            </div>
          </ListGroup>
        </Col>
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Placeholder as="h5" animation="glow">
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={12} />
                <Placeholder xs={10} />
              </Placeholder>
              <ListGroup variant="flush">
                {[
                  "Category",
                  "Subcategory",
                  "Brand",
                  "Price",
                  "In Stock",
                  "Rating",
                  "Review Count",
                  "Sales Count",
                  "Featured",
                  "Created At",
                ].map((item, index) => (
                  <ListGroup.Item key={index}>
                    <strong>{item}: </strong>
                    <Placeholder as="span" animation="glow">
                      <Placeholder xs={6} />
                    </Placeholder>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
