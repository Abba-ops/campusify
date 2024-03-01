import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { AiOutlineArrowUp } from "react-icons/ai";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = document.documentElement.scrollTop;
      setVisible(scrolled > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed-bottom" style={{ left: "20px", bottom: "20px" }}>
      <Button
        variant="primary"
        className={`shadow rounded ${visible ? "d-block" : "d-none"}`}
        onClick={scrollToTop}>
        <h3 className="text-white">
          <AiOutlineArrowUp />
        </h3>
      </Button>
    </div>
  );
}
