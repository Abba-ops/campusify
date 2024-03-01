import React from "react";
import { Stack } from "react-bootstrap";
import { RiStarFill, RiStarHalfFill, RiStarLine } from "react-icons/ri";

export default function StarRating({ value, text, size = 24 }) {
  const renderStarIcon = (num) => {
    if (value >= num) {
      return <RiStarFill key={num} size={size} />;
    } else if (value >= num - 0.5) {
      return <RiStarHalfFill key={num} size={size} />;
    } else {
      return <RiStarLine key={num} size={size} />;
    }
  };

  const stars = [1, 2, 3, 4, 5].map(renderStarIcon);

  return (
    <Stack direction="horizontal" gap={2}>
      <Stack direction="horizontal" gap={1} className="text-primary">
        {stars}
      </Stack>
      {text && <span>{text}</span>}
    </Stack>
  );
}
