import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MetaTags from "../components/MetaTags";
import BackToTop from "../components/BackToTop";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-5">
      <MetaTags
        title="Explore Our Campus Marketplace - Campusify"
        description="Learn about Campusify, the platform revolutionizing the way university students engage in commerce within their campus communities."
        keywords="Campusify, campus marketplace, student entrepreneurs, university life, e-commerce"
      />
      <Container>
        <Row>
          <Col lg={6} className="mb-4 mb-lg-0">
            <div>
              <h5 className="text-uppercase">Explore Our Campus Marketplace</h5>
              <p>
                At Campusify, we're dedicated to revolutionizing the way
                university students engage in commerce within their campus
                communities. Our platform is designed to be more than just an
                e-commerce site; it's a vibrant marketplace tailored
                specifically to the unique needs and dynamics of university
                life.
              </p>
              <h5 className="text-uppercase">Why Campusify?</h5>
              <p>
                Traditional marketplaces often fall short when it comes to
                catering to the specific needs of campus communities. That's
                where Campusify comes in. We understand the challenges that
                students face in showcasing and monetizing their products and
                services within their campus, and we're here to bridge that gap.
              </p>
              <h5 className="text-uppercase">Fostering Entrepreneurship</h5>
              <p>
                But Campusify is more than just a marketplace—it's a catalyst
                for entrepreneurship. By providing students with a platform to
                showcase their talents and ideas, we're helping to foster a
                culture of innovation and creativity on university campuses. We
                believe that by empowering students to become entrepreneurs,
                we're not only helping them succeed individually but also
                contributing to the development of vibrant entrepreneurial
                ecosystems within universities.
              </p>
            </div>
          </Col>
          <Col lg={6}>
            <div>
              <h5 className="text-uppercase">Our Mission</h5>
              <p>
                Our mission is simple yet powerful: to empower student
                entrepreneurs by providing them with the tools and opportunities
                they need to succeed. We believe that every student has the
                potential to turn their ideas and talents into thriving
                businesses, and we're here to support them every step of the
                way.
              </p>
              <h5 className="text-uppercase">Bridging the Gap</h5>
              <p>
                With Campusify, students no longer have to rely on generic
                e-commerce platforms that may not understand the dynamics of
                university life. Our platform is designed from the ground up to
                meet the needs of campus entrepreneurs, providing them with a
                user-friendly interface to register, showcase, and sell their
                products or services within their campus community.
              </p>
              <h5 className="text-uppercase">Join Us</h5>
              <p>
                Whether you're a student looking to turn your passion into
                profit or a campus community member eager to support local
                businesses, we invite you to join us on this journey. Together,
                we can build a brighter future for campus entrepreneurs
                everywhere.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <BackToTop />
    </section>
  );
}
