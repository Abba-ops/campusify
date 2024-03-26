import React from "react";
import { Carousel, Image, Button } from "react-bootstrap";
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
                <Image src="/images/playstation.jpg" fluid />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="col-lg-6 order-lg-1 text-center text-lg-start">
          <h1 className="display-5 fw-bold lh-sm mb-3 d-none d-lg-block">
            Empowering Campus Entrepreneurs
          </h1>
          <p className="lead fw-normal d-none d-lg-block text-muted">
            Empower yourself with our platform designed for campus
            entrepreneurs. Discover opportunities, connect with like-minded
            individuals, and turn your ideas into reality. Join us in building a
            vibrant community of innovators and creators, shaping the future
            together.
          </p>
          <div className="d-grid gap-3">
            <Button
              as={Link}
              size="lg"
              variant="primary"
              to={userInfo ? "/vendor-application" : "/login"}
              className="text-uppercase fw-semibold text-white">
              {userInfo ? "Start Selling" : "Get Started"}
            </Button>
            <Button
              as={Link}
              size="lg"
              variant="dark"
              to={"/about"}
              className="text-uppercase fw-semibold">
              Explore More
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
