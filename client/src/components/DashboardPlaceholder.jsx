import { Card, Col, Placeholder, Row } from "react-bootstrap";

export default function DashboardPlaceholder() {
  return (
    <>
      <Row className="mb-4">
        {[1, 2, 3, 4].map((item) => (
          <Col key={item} md={6} lg={3} className="mb-3">
            <Card className="shadow-sm">
              <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} />
                  <Placeholder xs={4} /> <Placeholder xs={6} />
                  <Placeholder xs={8} />
                </Placeholder>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        <Col lg={8} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />
                <Placeholder xs={4} /> <Placeholder xs={6} />
                <Placeholder xs={8} />
              </Placeholder>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />
                <Placeholder xs={4} /> <Placeholder xs={6} />
                <Placeholder xs={8} />
              </Placeholder>
            </Card.Body>
          </Card>
          <Card className="mt-3 shadow-sm">
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />
                <Placeholder xs={4} /> <Placeholder xs={6} />
                <Placeholder xs={8} />
              </Placeholder>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
