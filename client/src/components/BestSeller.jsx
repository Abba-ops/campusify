import React from "react";
import Container from "react-bootstrap/esm/Container";
import ProductsSlider from "./CarouselProducts";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/esm/Image";

export default function BestSeller() {
  return (
    <section>
      <Container className="py-5 bg-white">
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <div className="text-center">
              <p className="text-muted mb-3">Discover Our</p>
              <h2 className="text-uppercase mb-4">Best Sellers</h2>
            </div>
            <ProductsSlider lg={6} showPreviewIcon={true} />
          </Col>
          <Col lg={6} className="px-4">
            <Carousel indicators={false} controls={false}>
              <Carousel.Item>
                <Image src="/images/camera.jpg" fluid />
              </Carousel.Item>
              <Carousel.Item>
                <Image src="/images/camera.jpg" fluid />
              </Carousel.Item>
              <Carousel.Item>
                <Image src="/images/camera.jpg" fluid />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
