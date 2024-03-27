import React from "react";
import { Col, Row, Card } from "react-bootstrap";

export default function VendorHome() {
  return (
    <>
      <h2 className="mb-4">Vendor Dashboard</h2>
      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3">Welcome to Your Vendor Dashboard!</h5>
              <p className="text-secondary">
                Manage your products, view sales, and interact with customers
                effortlessly. Explore the available features below.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3">Quick Stats</h5>
              <Row>
                <Col xs={6} className="text-center">
                  <h6 className="mb-0">Total Products</h6>
                  <p className="text-secondary">120</p>
                </Col>
                <Col xs={6} className="text-center">
                  <h6 className="mb-0">Total Sales</h6>
                  <p className="text-secondary">$50,000</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3">Recent Orders</h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
