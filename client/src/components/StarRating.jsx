import React from "react";
import { Stack } from "react-bootstrap";
import { IoIosStarOutline, IoIosStarHalf, IoIosStar } from "react-icons/io";

export default function StarRating({ value, text }) {
  const renderStarIcon = (num) => {
    if (value >= num) {
      return <IoIosStar key={num} />;
    } else if (value >= num - 0.5) {
      return <IoIosStarHalf key={num} />;
    } else {
      return <IoIosStarOutline key={num} />;
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
