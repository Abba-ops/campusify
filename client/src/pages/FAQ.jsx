import React, { useEffect } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import MetaTags from "../components/MetaTags";

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
        <h5 className="pb-3 text-uppercase text-center">
          Frequently Asked Questions
        </h5>
        <Row>
          <Col lg={6} className="mb-6 mb-lg-0">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  How can I register as a buyer on the campus marketplace?
                </Accordion.Header>
                <Accordion.Body>
                  To register as a buyer, simply navigate to the registration
                  page on our platform and provide the required information such
                  as your name, email address, and student/staff identification
                  details.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  What steps do I need to take to become a vendor on the
                  platform?
                </Accordion.Header>
                <Accordion.Body>
                  To become a vendor, first register as a user on our platform.
                  Then, navigate to the vendor registration section and fill out
                  the necessary details regarding your store and products. Our
                  team will review your application, and upon approval, you can
                  start selling on the marketplace.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  What payment methods are accepted on the platform?
                </Accordion.Header>
                <Accordion.Body>
                  We accept various payment methods including debit/credit cards
                  and mobile payment solutions facilitated through Paystack, a
                  trusted online payment gateway in Nigeria. We do not offer
                  cash on delivery (COD) at this time.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  Is there a minimum order requirement for purchasing items on
                  the platform?
                </Accordion.Header>
                <Accordion.Body>
                  No, there is no minimum order requirement. You can purchase
                  items according to your needs and preferences without any
                  restrictions. Whether you're buying a single item or multiple
                  products, our platform caters to all orders, big or small.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col lg={6}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  How do I browse products available on the platform?
                </Accordion.Header>
                <Accordion.Body>
                  You can easily browse products by category or by using the
                  search bar located at the top of the page. Additionally, you
                  can explore featured products and promotions on the homepage.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  Is it safe to make transactions on the campus marketplace?
                </Accordion.Header>
                <Accordion.Body>
                  Yes, we prioritize the security of our users' transactions.
                  Our platform employs encryption protocols to safeguard
                  sensitive information, and we continually monitor for any
                  suspicious activity.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  How are disputes between buyers and vendors resolved?
                </Accordion.Header>
                <Accordion.Body>
                  In the event of a dispute, we encourage both parties to
                  communicate directly to resolve the issue amicably. If a
                  resolution cannot be reached, our customer support team is
                  available to mediate and provide assistance.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  Are there any fees associated with selling on the platform?
                </Accordion.Header>
                <Accordion.Body>
                  We charge a nominal commission fee on successful transactions
                  made by vendors on the platform. This fee contributes to the
                  maintenance and improvement of our services.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
