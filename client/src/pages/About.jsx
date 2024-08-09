import { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaStore, FaUserGraduate, FaHandshake, FaRegEye } from "react-icons/fa";
import MetaTags from "../components/MetaTags";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className="py-5">
      <MetaTags
        title="About Us - Campusify"
        description="Learn more about Campusify, the innovative e-commerce platform for Thomas Adewumi University, empowering campus entrepreneurs."
        keywords="About Campusify, university marketplace, campus e-commerce, student entrepreneurship"
      />

      <Row className="text-center mb-3">
        <Col>
          <h2>About Campusify</h2>
          <p className="lead">
            Unleashing the entrepreneurial spirit at Thomas Adewumi University
            by connecting students and staff in a dynamic marketplace.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6} className="mb-5 mb-lg-0">
          <img
            width={500}
            height={300}
            alt="Campus Marketplace"
            className="img-fluid rounded"
            src="/images/about-page-hero.jpg"
          />
        </Col>
        <Col md={6}>
          <Card className="p-2">
            <Card.Body>
              <h5 className="text-center mb-3">Welcome to Campusify!</h5>
              <Card.Text>
                Campusify is an innovative e-commerce marketplace designed
                exclusively for the Thomas Adewumi University community. Our
                platform empowers students and staff to engage in buying and
                selling within the campus, fostering entrepreneurship and
                creating opportunities for everyone.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="text-center mb-4">
        <Col md={4}>
          <FaUserGraduate size="3em" className="mb-3 text-primary" />
          <h4>For Students and Staff</h4>
          <p>
            Seamless registration using your magic number or university email.
          </p>
        </Col>
        <Col md={4}>
          <FaStore size="3em" className="mb-3 text-primary" />
          <h4>Become a Vendor</h4>
          <p>
            Apply to become a vendor and showcase your products to the campus
            community.
          </p>
        </Col>
        <Col md={4}>
          <FaHandshake size="3em" className="mb-3 text-primary" />
          <h4>Community-Centric</h4>
          <p>Safe, local transactions benefiting all participants.</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="p-2">
            <Card.Body>
              <Row>
                <Col md={4} className="text-center">
                  <FaRegEye size="3em" className="mb-3 text-primary" />
                  <h4>Our Vision</h4>
                </Col>
                <Col md={8}>
                  <Card.Text>
                    We envision a thriving marketplace where campus
                    entrepreneurs can flourish, connect, and contribute to a
                    vibrant university ecosystem. Our goal is to nurture talent
                    and innovation, providing a platform that encourages
                    creativity and economic growth. By facilitating seamless
                    transactions and fostering a supportive environment, we aim
                    to empower individuals to achieve their entrepreneurial
                    aspirations and make a positive impact within the university
                    and beyond.
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
