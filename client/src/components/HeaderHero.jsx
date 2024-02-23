import React from "react";
import { Carousel, Image, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HeaderHero() {
  return (
    <Container className="bg-white px-4 border-bottom">
      <div className="row flex-lg-row-reverse align-items-center py-5">
        <div className="col-lg-6">
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
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold lh-sm mb-3 d-none d-lg-block">
            Empowering Campus Entrepreneurs
          </h1>
          <p className="lead fw-normal text-muted d-none d-lg-block">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
            voluptates atque eum modi dicta officia consequatur provident neque,
            esse, repudiandae iusto nemo sapiente optio ratione?
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center justify-content-lg-start">
            <Button size="lg" className="px-4 me-md-2 text-white">
              Browse Now
            </Button>
            <Link to={"/login"}>
              <Button
                size="lg"
                variant="link"
                className="px-4 w-100 text-decoration-none">
                Start Selling
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
