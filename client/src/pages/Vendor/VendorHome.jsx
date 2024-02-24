import React from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Stack,
} from "react-bootstrap";
import { FaRegUser, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function VendorHome() {
  return (
    <Container className="py-4">
      <h6 className="fw-medium">Welcome to Your Vendor Dashboard!</h6>
      <div className="text-secondary">
        Manage your products and sales effortlessly.
      </div>
      <Container className="my-4">
        <Row>
          <Col lg={9}>
            <Row></Row>
          </Col>
          <Col lg={3}>
            <Col className="bg-white rounded py-2"></Col>
          </Col>
        </Row>
      </Container>
      {/* <Container>
        <Row className="my-4 gap-4">
          <Col lg={2} className="bg-white rounded">
            <Row>
              <Col lg={2}>
                <FaUser />
              </Col>
              <Col>
                <div>
                  <div>Welcome</div>
                  <h5>124</h5>
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg={2} className="bg-white rounded">
            <Row>
              <Col lg={2}>
                <FaUser />
              </Col>
              <Col>
                <div>
                  <div>Welcome</div>
                  <h5>124</h5>
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg={2} className="bg-white rounded">
            <Row>
              <Col lg={2}>
                <FaUser />
              </Col>
              <Col>
                <div>
                  <div>Welcome</div>
                  <h5>124</h5>
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg={2} className="bg-white rounded">
            <Row>
              <Col lg={2}>
                <FaUser />
              </Col>
              <Col>
                <div>
                  <div>Welcome</div>
                  <h5>124</h5>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container> */}
    </Container>
  );
}
