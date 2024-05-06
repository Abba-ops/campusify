import React from "react";
import { Carousel, Image, Button, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function HeaderHero() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <header className="px-lg-4 border-bottom">
      <div className="row flex-lg-row align-items-center py-5">
        <div className="col-lg-6 order-lg-2 mb-4 mb-lg-0">
          <Carousel indicators={false} controls={false}>
            {[1, 2, 3].map((index) => (
              <Carousel.Item key={index}>
                <Image src={`/images/hero_image_${index}.jpg`} fluid />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="col-lg-6 order-lg-1 text-center text-lg-start">
          <h1 className="display-5 fw-bold lh-sm mb-3 d-none d-lg-block">
            Empowering Campus Entrepreneurs
          </h1>
          <p className="lead fw-normal d-none d-lg-block text-muted">
            Welcome to Campus Market, where campus entrepreneurs thrive. Join
            our marketplace to buy, sell, and connect with your campus
            community. Explore and start your journey today. Welcome to Campus
            Market!
          </p>
          <ButtonGroup className="d-grid gap-3 d-md-flex justify-content-md-start">
            <Button
              as={Link}
              size="lg"
              variant="primary"
              className="text-uppercase fw-semibold text-white">
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
              }
              className="text-uppercase fw-semibold">
              Start Selling
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </header>
  );
}
