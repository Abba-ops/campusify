import React from "react";
import Container from "react-bootstrap/esm/Container";
import ProductsSlider from "./CarouselProducts";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/esm/Image";

export default function BestSeller() {
  return (
    <Container className="bg-white py-5">
      <section>
        <Row className="d-flex align-items-center">
          <Col lg={6}>
            <div className="text-center">
              <p className="text-muted">Lorem ipsum dolor sit.</p>
              <h2 className="text-uppercase text-body-emphasis">Best Seller</h2>
            </div>
            <ProductsSlider lg={6} showIcon={true} />
          </Col>
          <Col lg={6} className="mt-5 mt-lg-0 px-4">
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
      </section>
    </Container>
  );
}
