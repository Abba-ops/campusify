import React from "react";
import { Col, Container, Image, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import errorOccurred from "../assets/errorOccurred.png";

const ErrorPage = () => {
  return (
    <section className="bg-white pb-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <Image src={errorOccurred} alt="Error Occurred" fluid />
          </Col>
          <Col md={6} className="text-center text-md-left">
            <h1 className="display-4 mb-3">Uh-Oh, Something's Not Right</h1>
            <p className="lead mb-4">
              We encountered an issue. It seems there's a problem with your
              internet connection. Please check and try again. If the problem
              persists, ensure you are connected to a stable network or contact
              your network administrator.
            </p>
            <div className="mb-4">
              <Link to="/">
                <Button variant="primary" size="lg">
                  Refresh Page
                </Button>
              </Link>
            </div>
            <p className="text-muted mb-0">
              If the issue persists, contact support at{" "}
              <Link to="mailto:jadesolakajeyale@gmail.com">
                jadesolakajeyale@gmail.com
              </Link>
              .
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ErrorPage;
