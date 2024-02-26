import React from "react";
import { Col, Container, Image, Row, Button } from "react-bootstrap";
import pageNotFound from "../assets/pageNotFound.png";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <section className="bg-white pb-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <Image src={pageNotFound} alt="404 Image" fluid />
          </Col>
          <Col lg={6} className="text-center text-lg-left">
            <h1 className="display-4 mb-3">Oops! Page not found.</h1>
            <p className="lead mb-4">
              It seems like you've stumbled upon a non-existent corner of our
              store. Let's guide you back to where the action is.
            </p>
            <div className="mb-4">
              <Link to={"/"}>
                <Button variant="primary">Return to Home</Button>
              </Link>
              <Link to={"/categories"}>
                <Button variant="outline-primary" className="ml-2">
                  Explore Categories
                </Button>
              </Link>
            </div>
            <div>
              <p className="mb-1">
                For assistance, please contact our support team:
              </p>
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
