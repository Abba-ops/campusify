import React, { useEffect } from "react";
import MetaTags from "../components/MetaTags";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { contactInfo } from "../constants";

export default function ErrorPage() {
  const supportEmail = contactInfo.find((info) => info.type === "email");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <MetaTags
        title="Oops! Something Went Wrong - Campusify"
        description="We encountered an issue. It seems there's a problem with your internet connection. Please check and try again. If the problem persists, make sure you are connected."
        keywords="error, issue, internet connection, troubleshooting"
      />
      <section>
        <Container>
          <Row className="justify-content-center align-items-center text-center">
            <Col lg={8}>
              <h2 className="display-4 mb-3">Oops! Something Went Wrong</h2>
              <p className="lead mb-4">
                We encountered an issue. It seems there's a problem with your
                internet connection. Please check and try again. If the problem
                persists, make sure you are connected to a stable network or
                contact your network administrator.
              </p>
              <div className="mb-4">
                <Button
                  to="/"
                  as={Link}
                  size="lg"
                  variant="primary"
                  className="px-4 text-white">
                  Refresh Page
                </Button>
              </div>
              <p className="text-muted mb-0">
                If the issue persists, please contact support at{" "}
                <Link to={`mailto:${supportEmail.info}`}>
                  {supportEmail.info}
                </Link>
                .
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
