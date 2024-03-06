import React from "react";
import { Row, Col, Card } from "react-bootstrap";

export default function AdminHome() {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2>Admin Dashboard</h2>
          <p>
            <small>
              Welcome to the admin dashboard. Explore the available features
              below.
            </small>
          </p>
        </div>
        <div></div>
      </div>
      <Row className="mt-4">
        <Col lg={4} md={6}>
          <Card>
            <Card.Body>
              <h5>Feature 1</h5>
              <p>Description of Feature 1.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} md={6}>
          <Card>
            <Card.Body>
              <h5>Feature 2</h5>
              <p>Description of Feature 2.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} md={6}>
          <Card>
            <Card.Body>
              <h5>Feature 3</h5>
              <p>Description of Feature 3.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
