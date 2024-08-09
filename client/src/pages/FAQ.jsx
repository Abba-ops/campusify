import { useEffect } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import MetaTags from "../components/MetaTags";
import BackToTop from "../components/BackToTop";
import { faqItems } from "../constants";
import { FaQuestionCircle } from "react-icons/fa";

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
        <Row className="justify-content-center text-center mb-3">
          <Col lg={8}>
            <div className="d-flex justify-content-center align-items-center mb-3">
              <FaQuestionCircle size="3em" className="text-primary" />
            </div>
            <h2>Frequently Asked Questions</h2>
            <p className="lead">
              Have questions about using Campusify? Find answers to the most
              common queries below.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={8}>
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
      <BackToTop />
    </section>
  );
}
