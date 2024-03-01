import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <section className="bg-white py-5">
      <Container>
        <Row className="justify-content-center align-items-center text-center">
          <Col lg={8}>
            <h1 className="display-4 mb-3">Oops! Page not found.</h1>
            <p className="lead mb-4">
              It seems you've taken a detour to an undiscovered part of our
              store. Let's get you back on track to where all the excitement
              happens.
            </p>
            <div className="mb-4">
              <Link to="/">
                <Button variant="primary">Return to Home</Button>
              </Link>
              <Link to="/categories">
                <Button variant="outline-primary" className="ml-2">
                  Explore Categories
                </Button>
              </Link>
            </div>
            <div>
              <p className="mb-1">Need assistance? Contact our support team:</p>
              <Link to="mailto:jadesolakajeyale@gmail.com">
                jadesolakajeyale@gmail.com
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
