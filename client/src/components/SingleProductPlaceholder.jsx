import React from "react";
import { Col, Placeholder } from "react-bootstrap";

export default function SingleProductPlaceholder({ lgColumnSize }) {
  return (
    <Col lg={lgColumnSize} md={6}>
      <Placeholder as="div" animation="glow" className="placeholder-glow">
        <span className="placeholder col-12" style={{ height: "250px" }}></span>
        <span
          className="placeholder col-12 mt-2"
          style={{ height: "20px" }}></span>
        <span
          className="placeholder col-10 mt-2"
          style={{ height: "10px" }}></span>
        <span
          className="placeholder col-12 mt-2"
          style={{ height: "20px" }}></span>
        <span
          className="placeholder col-8 mt-2"
          style={{ height: "10px" }}></span>
        <span
          className="placeholder col-10 mt-2"
          style={{ height: "15px" }}></span>
      </Placeholder>
    </Col>
  );
}
