import React, { useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { contactInfo } from "../constants";
import MetaTags from "../components/MetaTags";

export default function PageNotFound() {
  const supportEmail = contactInfo.find((info) => info.type === "email");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-5">
      <MetaTags
        title="Page Not Found - Campusify"
        description="Oops! Page not found. It seems you've taken a detour to an undiscovered part of our store. Let's get you back on track."
        keywords="404, page not found, store, website"
      />
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
              <a href={`mailto:${supportEmail.info}`}>{supportEmail.info}</a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
