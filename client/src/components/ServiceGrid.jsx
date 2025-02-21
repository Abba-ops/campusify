import { Row, Col } from "react-bootstrap";
import { services } from "../constants";

export default function ServiceGrid() {
  return (
    <section className="py-5 border-bottom">
      <Row>
        {services.map(({ icon, service, text }, index) => (
          <Col
            xs={6}
            lg={3}
            key={index}
            className="d-flex align-items-center flex-column text-center">
            <div className="text-white px-4 p-3 mb-4 fs-3 bg-primary rounded">
              {icon}
            </div>
            <h6>{service}</h6>
            <p className="text-muted">{text}</p>
          </Col>
        ))}
      </Row>
    </section>
  );
}
