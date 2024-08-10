import { Card, Col, Image, Placeholder, Row } from "react-bootstrap";

export default function UserProfilePlaceholder() {
  return (
    <Row>
      <Col md={6} className="mb-4 mb-lg-0">
        <Card className="shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-center mb-3">
              <Image
                fluid
                roundedCircle
                loading="lazy"
                className="profile-picture-lg placeholder"
              />
            </div>
            <Placeholder
              as={Card.Title}
              animation="glow"
              className="text-center">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder
              as={Card.Text}
              animation="glow"
              className="text-center">
              <Placeholder xs={8} />
            </Placeholder>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card className="shadow-sm">
          <Card.Body>
            <h5>User Profile Information</h5>
            <Placeholder as={Card.Text} animation="glow">
              <strong>ID: </strong>
              <Placeholder xs={4} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <strong>Email: </strong>
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <strong>Phone Number: </strong>
              <Placeholder xs={5} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <strong>Account Type: </strong>
              <Placeholder xs={3} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <strong>Account Creation Date: </strong>
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <strong>Is Vendor: </strong>
              <Placeholder xs={2} />
            </Placeholder>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
