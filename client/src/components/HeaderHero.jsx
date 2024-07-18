import React from "react";
import { Carousel, Image, Button, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function HeaderHero() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <header className="px-lg-4 border-bottom">
      <div className="row flex-lg-row align-items-center">
        <div className="col-lg-6 order-lg-2">
          <Carousel indicators={false} controls={false}>
            {[1, 2, 3].map((index) => (
              <Carousel.Item key={index}>
                <div className="image-container">
                  <Image
                    fluid
                    className="product-image"
                    src={`/images/hero_image_${index}.svg`}
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="col-lg-6 order-lg-1 text-center text-lg-start">
          <h1 className="display-5 fw-bold lh-sm mb-3 d-none d-lg-block">
            Empowering Campus Entrepreneurs
          </h1>
          <p className="lead fw-normal d-none d-lg-block text-muted">
            Join Campus Market, your university's premier e-commerce platform.
            Connect with fellow students and staff, buy and sell easily, and
            make the most of campus life. Get started now!
          </p>
          <ButtonGroup className="d-grid gap-3 d-md-flex justify-content-md-start">
            <Button
              as={Link}
              size="lg"
              variant="primary"
              className="text-white">
              Shop Now
            </Button>
            <Button
              as={Link}
              size="lg"
              variant="dark"
              to={
                userInfo
                  ? "/vendor-application"
                  : `/register?redirect=/vendor-application`
              }>
              Start Selling
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </header>
  );
}
