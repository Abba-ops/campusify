import React from "react";
import { Carousel, Image, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HeaderHero() {
  return (
    <Container className="bg-white px-4 border-bottom">
      <div className="row flex-column-reverse flex-lg-row align-items-center py-5">
        <div className="col-lg-6 order-lg-2 mb-4 mb-lg-0">
          <Carousel indicators={false} controls={false}>
            <Carousel.Item>
              <Image src="/images/playstation.jpg" fluid />
            </Carousel.Item>
            <Carousel.Item>
              <Image src="/images/playstation.jpg" fluid />
            </Carousel.Item>
            <Carousel.Item>
              <Image src="/images/playstation.jpg" fluid />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="col-lg-6 order-lg-1 text-center text-lg-start">
          <h1 className="display-5 fw-bold lh-sm mb-3">
            Empowering Campus Entrepreneurs
          </h1>
          <p className="lead fw-normal text-muted mb-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
            voluptates atque eum modi dicta officia consequatur provident neque,
            esse, repudiandae iusto nemo sapiente optio ratione?
          </p>
          <div className="d-grid gap-2">
            <Button
              size="lg"
              className="px-4 text-white"
              variant="primary"
              block>
              Browse Now
            </Button>
            <Link to="/login" className="text-decoration-none">
              <Button
                size="lg"
                variant="outline-primary"
                className="px-4 mt-3 w-100">
                Start Selling
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
