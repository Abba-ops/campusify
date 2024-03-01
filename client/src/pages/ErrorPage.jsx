import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="py-5">
      <Container>
        <Row className="justify-content-center align-items-center text-center">
          <Col lg={8}>
            <h1 className="display-4 mb-3">Oops! Something Went Wrong</h1>
            <p className="lead mb-4">
              We encountered an issue. It seems there's a problem with your
              internet connection. Please check and try again. If the problem
              persists, make sure you are connected to a stable network or
              contact your network administrator.
            </p>
            <div className="mb-4">
              <Link to="/">
                <Button variant="primary" size="lg">
                  Refresh Page
                </Button>
              </Link>
            </div>
            <p className="text-muted mb-0">
              If the issue persists, please contact support at{" "}
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
