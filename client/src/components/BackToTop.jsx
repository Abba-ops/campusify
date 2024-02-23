import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { IoIosArrowUp } from "react-icons/io";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      setVisible(scrolled > 300);
    };

    window.addEventListener("scroll", toggleVisible);

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed-bottom" style={{ left: "initial" }}>
      <Button
        variant="primary"
        className={`my-3 mx-4 py-1 px-2 ${visible ? "d-block" : "d-none"}`}
        onClick={scrollToTop}>
        <h3>
          <IoIosArrowUp className="text-white" />
        </h3>
      </Button>
    </div>
  );
}
