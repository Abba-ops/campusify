import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Stack from "react-bootstrap/Stack";
import { contactInfo } from "../constants";

export default function ContactScreen() {
  return (
    <section className="bg-white py-5">
      <Container>
        <Row>
          <Col lg={8} className="mb-5 mb-lg-0">
            <h5 className="text-uppercase fw-bold text-body-emphasis mb-3">
              Contact Us
            </h5>
            <Form>
              <Form.Group as={Row} className="my-4">
                <Form.Label column sm={4} className="raleway">
                  First name
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    className="rounded-0"
                    placeholder="Jadesola"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="my-4">
                <Form.Label column sm={4} className="raleway">
                  Last name
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    className="rounded-0"
                    placeholder="Kajeyale"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="my-4">
                <Form.Label column sm={4} className="raleway">
                  Email address
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    className="rounded-0"
                    placeholder="johnbabs182@gmail.com"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="my-4">
                <Form.Label column sm={4} className="raleway">
                  Message
                </Form.Label>
                <Col sm={8}>
                  <FloatingLabel label="Message">
                    <Form.Control
                      as="textarea"
                      className="rounded-0"
                      placeholder="How can we help?"
                      style={{ height: "100px" }}
                    />
                  </FloatingLabel>
                </Col>
              </Form.Group>
              <Button
                className="rounded-0 text-uppercase raleway"
                variant="dark">
                Send
              </Button>
            </Form>
          </Col>
          <Col lg={4}>
            <h5 className="text-uppercase fw-bold text-body-emphasis mb-3">
              Information
            </h5>
            <p className="raleway lead">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel
              porro, quibusdam temporibus atque architecto quis reprehenderit,
              enim iste quae dolores deserunt recusandae beatae. Quod expedita
              nihil est explicabo quasi distinctio.
            </p>
            <Stack direction="vertical" gap={2}>
              {contactInfo.map(({ icon, info }, index) => (
                <Stack gap={3} key={index} direction="horizontal">
                  <p>{icon}</p>
                  <p>{info}</p>
                </Stack>
              ))}
            </Stack>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
