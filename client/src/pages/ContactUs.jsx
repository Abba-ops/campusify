import React, { useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { contactInfo } from "../constants";
import MetaTags from "../components/MetaTags";

export default function ContactUs() {
  const renderContactInfo = () => {
    return contactInfo.map(({ icon, info }, index) => (
      <Stack gap={3} key={index} direction="horizontal">
        <p>{icon}</p>
        <p>{info}</p>
      </Stack>
    ));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-5">
      <MetaTags
        title="Contact Us - Campusify"
        description="Have questions or feedback? Contact us via this form or through our provided contact information. We're here to assist you!"
        keywords="contact us, feedback, suggestions, campus marketplace, customer support"
      />
      <Container>
        <Row>
          <Col lg={8} className="mb-6 mb-lg-0">
            <h5 className="text-uppercase mb-3">Contact Us</h5>
            <Form>
              <Form.Group as={Row} className="mb-4">
                <Form.Label column sm={4}>
                  First Name
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" placeholder="John" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-4">
                <Form.Label column sm={4}>
                  Last Name
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" placeholder="Doe" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-4">
                <Form.Label column sm={4}>
                  Email Address
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="email"
                    placeholder="johndoe@example.com"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-4">
                <Form.Label column sm={4}>
                  Message
                </Form.Label>
                <Col sm={8}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      rows={3}
                      as="textarea"
                      placeholder="Your message here..."
                    />
                  </Form.Group>
                </Col>
              </Form.Group>
              <Button variant="dark" className="px-4">
                Send
              </Button>
            </Form>
          </Col>
          <Col lg={4}>
            <h5 className="text-uppercase mb-3">Information</h5>
            <p>
              For any feedback or suggestions to enhance your experience on our
              campus marketplace, please take a moment to fill out this contact
              form. Your input is invaluable to us as we strive to improve and
              cater to your needs. We commit to reviewing your submissions
              promptly and responding within 24 hours. Thank you for helping us
              elevate your shopping journey on our platform. Your feedback fuels
              our continuous improvement efforts, ensuring a seamless and
              satisfying experience for all.
            </p>
            <Stack direction="vertical" gap={2}>
              {renderContactInfo()}
            </Stack>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
