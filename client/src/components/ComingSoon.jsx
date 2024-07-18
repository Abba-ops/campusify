import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import MetaTags from "../components/MetaTags";

const ComingSoon = ({ launchDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(launchDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <Col key={interval} xs={6} sm={3} className="timer-segment mb-3">
        <Card className="text-center">
          <Card.Body>
            <Card.Title as="h2" className="display-4 mb-0">
              {timeLeft[interval]}
            </Card.Title>
            <Card.Text className="text-muted text-uppercase">
              {interval}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  });

  return (
    <>
      <MetaTags
        title="Coming Soon - Campusify"
        description="This feature or page is coming soon. Stay tuned for updates!"
        keywords="coming soon, new feature, Campusify"
      />
      <Container className="py-5 text-center">
        <Row>
          <Col>
            <h1 className="display-4 mb-3">Coming Soon</h1>
            <p className="lead mb-4">
              We're working hard to bring you this feature. Stay tuned for
              updates!
            </p>
            {timerComponents.length ? (
              <div className="mb-4">
                <h2 className="mb-3">Launching In:</h2>
                <Row className="justify-content-center">{timerComponents}</Row>
              </div>
            ) : (
              <div className="mb-4">
                <h2>Launching Soon!</h2>
              </div>
            )}
            <Button
              to="/"
              as={Link}
              variant="primary"
              className="px-4 text-white">
              Go to Home
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ComingSoon;
