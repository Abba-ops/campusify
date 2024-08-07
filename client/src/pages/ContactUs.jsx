import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import MetaTags from "../components/MetaTags";
import BackToTop from "../components/BackToTop";

const contactInfo = [
  {
    icon: <FaMapMarkerAlt />,
    info: "Thomas Adewumi University, Oko-Irese, Kwara State",
  },
  { icon: <FaPhoneAlt />, info: "0905-392-9899" },
  { icon: <FaEnvelope />, info: "info@tau.edu.ng" },
];

export default function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="py-5">
      <MetaTags
        title="Contact Us - Campusify"
        description="Have questions or feedback? Contact us via this form or through our provided contact information. We're here to assist you!"
        keywords="contact us, feedback, suggestions, campus marketplace, customer support"
      />
      <Container>
        <Row className="text-center mb-4">
          <Col>
            <h2>Contact Us</h2>
            <p className="lead">
              We’re here to help! Reach out to us with any questions or
              feedback.
            </p>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col lg={6} className="mb-5 mb-lg-0">
            <Card className="p-3">
              <Card.Body>
                <h4 className="mb-4">Send Us a Message</h4>
                <Form onSubmit={handleSubmit}>
                  <Form.Group
                    as={Row}
                    controlId="formFirstName"
                    className="mb-3">
                    <Form.Label
                      column
                      sm={3}
                      className="text-center text-lg-start">
                      First Name
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                        required
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    controlId="formLastName"
                    className="mb-3">
                    <Form.Label
                      column
                      sm={3}
                      className="text-center text-lg-start">
                      Last Name
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        required
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formEmail" className="mb-3">
                    <Form.Label
                      column
                      sm={3}
                      className="text-center text-lg-start">
                      Email
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                        placeholder="johndoe@example.com"
                        required
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formMessage" className="mb-4">
                    <Form.Label
                      column
                      sm={3}
                      className="text-center text-lg-start">
                      Message
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        as="textarea"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        placeholder="Your message here..."
                        required
                      />
                    </Col>
                  </Form.Group>
                  <Button variant="dark" type="submit" className="px-4">
                    Send
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="p-3">
              <Card.Body>
                <h4 className="mb-4">Contact Information</h4>
                <p>
                  For any feedback or suggestions, please use the form on the
                  left or reach out to us through the contact details below. We
                  aim to respond to all inquiries within 24 hours.
                </p>
                {contactInfo.map(({ icon, info }, index) => (
                  <div key={index} className="d-flex align-items-center mb-3">
                    <div className="me-3 text-primary">{icon}</div>
                    <div>{info}</div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <BackToTop />
    </section>
  );
}
