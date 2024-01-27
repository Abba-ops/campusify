import React from "react";
import { Carousel, Image, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Hero() {
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
            Embark on a journey through TAU's vibrant marketplace, where student
            and staff creativity converge with entrepreneurship. Uncover unique
            products crafted by our community members. Connect, showcase, and
            acquire from the diverse talents within TAU, elevating your
            university experience with the dynamic spirit of our marketplace.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center justify-content-lg-start">
            <Button
              size="lg"
              className="px-4 me-md-2 text-white rounded-0 text-uppercase">
              Browse Now
            </Button>
            <Link to={"/login"}>
              <Button
                size="lg"
                variant="dark"
                className="px-4 w-100 rounded-0 text-uppercase">
                Start Selling
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
