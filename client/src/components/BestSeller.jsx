import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import CarouselProducts from "./CarouselProducts";

export default function BestSeller() {
  return (
    <section className="py-5">
      <Row className="align-items-center">
        <Col lg={6} className="mb-5 mb-lg-0">
          <div className="text-center">
            <p className="text-muted mb-3">Discover Our</p>
            <h2 className="text-uppercase mb-4">Best Sellers</h2>
          </div>
          <CarouselProducts lgColumnSize={6} showPreviewIcon={true} />
        </Col>
        <Col lg={6}>
          <Carousel indicators={false} controls={false}>
            {[1, 2, 3].map((item) => (
              <Carousel.Item key={item}>
                <Image src="/images/camera.jpg" fluid />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </section>
  );
}
