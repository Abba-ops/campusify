import {
  Row,
  Col,
  Card,
  ListGroup,
  Placeholder,
  Button,
  Stack,
  Spinner,
  Image,
} from "react-bootstrap";

export default function VendorLoadingPlaceholder({ isApproving }) {
  return (
    <Row>
      <Col md={4} className="mb-4 mb-lg-0">
        <Card className="shadow-sm">
          <Card.Body className="text-center">
            <Image
              fluid
              roundedCircle
              loading="lazy"
              className="profile-picture-lg border mb-3 placeholder"
            />
            <Placeholder as="h5" animation="glow" className="mb-3">
              <Placeholder xs={6} />
            </Placeholder>
            <div className="d-flex justify-content-center">
              <Stack direction="horizontal" gap={3}>
                <Button variant="primary" className="text-white" disabled>
                  {isApproving ? (
                    <Spinner size="sm" animation="border" />
                  ) : (
                    <Placeholder xs={8} />
                  )}
                </Button>
                <Button variant="dark" className="px-4" disabled>
                  {isApproving ? (
                    <Spinner size="sm" animation="border" />
                  ) : (
                    <Placeholder xs={6} />
                  )}
                </Button>
              </Stack>
            </div>
          </Card.Body>
        </Card>
        <Card className="shadow-sm mt-3">
          <Card.Body>
            <h5>Recent Products</h5>
            <ListGroup variant="flush">
              {[...Array(3)].map((_, index) => (
                <ListGroup.Item key={index}>
                  <Placeholder
                    as="div"
                    animation="glow"
                    className="text-truncate">
                    <Placeholder xs={10} />
                  </Placeholder>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
      <Col md={8}>
        <Card className="shadow-sm mb-3">
          <Card.Body>
            <h5>Vendor Description</h5>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={12} />
                  <Placeholder xs={9} />
                </Placeholder>
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={12} />
                  <Placeholder xs={9} />
                </Placeholder>
              </ListGroup.Item>
              <ListGroup.Item>
                {[
                  "Estimated Delivery Time",
                  "Approval Date",
                  "Date Joined",
                ].map((item, index) => (
                  <p key={index}>
                    <strong>{item}: </strong>
                    <Placeholder as="span" animation="glow">
                      <Placeholder xs={6} />
                    </Placeholder>
                  </p>
                ))}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>

        <Card className="shadow-sm">
          <Card.Body>
            <h5>Contact Information</h5>
            <ListGroup variant="flush">
              {[
                "Email",
                "Phone",
                "Average Rating",
                "Sales Count",
                "Approval Status",
                "Created By",
                "Creator's Email",
                "Creator's Phone",
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
  );
}
