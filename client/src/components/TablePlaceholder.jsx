import React from "react";
import { Placeholder } from "react-bootstrap";

export default function TablePlaceholder() {
  return (
    <Placeholder as="div" animation="glow" className="placeholder-glow">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <span className="placeholder col-2" style={{ height: "20px" }}></span>
        <span className="placeholder col-4" style={{ height: "20px" }}></span>
        <span className="placeholder col-3" style={{ height: "20px" }}></span>
        <span className="placeholder col-2" style={{ height: "20px" }}></span>
        <span className="placeholder col-1" style={{ height: "20px" }}></span>
      </div>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <span className="placeholder col-3" style={{ height: "20px" }}></span>
        <span className="placeholder col-4" style={{ height: "20px" }}></span>
        <span className="placeholder col-2" style={{ height: "20px" }}></span>
        <span className="placeholder col-2" style={{ height: "20px" }}></span>
        <span className="placeholder col-1" style={{ height: "20px" }}></span>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <span className="placeholder col-5" style={{ height: "20px" }}></span>
        <span className="placeholder col-3" style={{ height: "20px" }}></span>
        <span className="placeholder col-2" style={{ height: "20px" }}></span>
        <span className="placeholder col-1" style={{ height: "20px" }}></span>
      </div>
    </Placeholder>
  );
}
