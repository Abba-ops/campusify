import React from "react";
import { RiStarLine, RiStarFill, RiStarHalfFill } from "react-icons/ri";

export default function Rating({ value }) {
  const stars = [1, 2, 3, 4, 5].map((num) => {
    const icon =
      value >= num ? (
        <RiStarFill key={num} />
      ) : value >= num - 0.5 ? (
        <RiStarHalfFill key={num} />
      ) : (
        <RiStarLine key={num} />
      );
    return icon;
  });

  return (
    <span className="text-primary d-flex gap-2 align-items-center">
      {stars}
    </span>
  );
}
