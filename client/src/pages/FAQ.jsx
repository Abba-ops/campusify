import React, { useEffect } from "react";
import { Accordion, Col, Container, Image, Row } from "react-bootstrap";
import MetaTags from "../components/MetaTags";
import { faqItems } from "../constants";

export default function FAQ() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-5">
      <MetaTags
        title="Frequently Asked Questions - Campusify"
        description="Find answers to common questions about using Campusify, your trusted campus marketplace."
        keywords="FAQ, frequently asked questions, campus marketplace, buying, selling, registration, payment"
      />
      <Container>
        <Row>
          <Col lg={6} className="mb-4 mb-lg-0">
            <div className="image-container">
              <Image
                fluid
                className="product-image"
                src="/images/faqs-image.png"
              />
            </div>
          </Col>
          <Col lg={6}>
            <h2 className="pb-3 text-uppercase text-center">
              Frequently Asked Questions
            </h2>
            <Accordion defaultActiveKey="0">
              {faqItems.map((item, index) => (
                <Accordion.Item key={index} eventKey={index.toString()}>
                  <Accordion.Header>{item.question}</Accordion.Header>
                  <Accordion.Body>{item.answer}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
