import { Card, Col, Row, ListGroup, Placeholder } from "react-bootstrap";

export default function OrderDetailsLoader() {
  return (
    <Row>
      <Col md={6}>
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <h5>
              <Placeholder as="span" animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
            </h5>
            <ListGroup variant="flush">
              {Array.from({ length: 6 }).map((_, index) => (
                <ListGroup.Item key={index}>
                  <Placeholder as="span" animation="glow">
                    <Placeholder xs={6} />
                  </Placeholder>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>

        <Card className="shadow-sm mb-4">
          <Card.Body>
            <h5>
              <Placeholder as="span" animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
            </h5>
            <ListGroup variant="flush">
              {Array.from({ length: 7 }).map((_, index) => (
                <ListGroup.Item key={index}>
                  <Placeholder as="span" animation="glow">
                    <Placeholder xs={6} />
                  </Placeholder>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>

      <Col md={6}>
        <Card className="shadow-sm">
          <Card.Body>
            <h5>
              <Placeholder as="span" animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
            </h5>
            <ListGroup variant="flush">
              {Array.from({ length: 3 }).map((_, index) => (
                <ListGroup.Item key={index}>
                  <Row className="align-items-center">
                    <Col xs={4} lg={3}>
                      <div className="image-container">
                        <Placeholder
                          as="div"
                          animation="glow"
                          className="rounded"
                          style={{ width: "100%", height: "80px" }}>
                          <Placeholder xs={12} />
                        </Placeholder>
                      </div>
                    </Col>
                    <Col xs={8} lg={5}>
                      <Placeholder as="div" animation="glow">
                        <Placeholder xs={8} />
                      </Placeholder>
                      <Placeholder as="div" animation="glow">
                        <Placeholder xs={6} />
                      </Placeholder>
                      <Placeholder as="div" animation="glow">
                        <Placeholder xs={4} />
                      </Placeholder>
                    </Col>
                    <Col lg={4} className="text-lg-center mt-3 mt-lg-0">
                      <Placeholder as="div" animation="glow">
                        <Placeholder xs={8} />
                      </Placeholder>
                      <Placeholder as="div" animation="glow" className="mt-1">
                        <Placeholder xs={8} />
                      </Placeholder>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
