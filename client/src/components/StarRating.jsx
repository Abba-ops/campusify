import { Stack } from "react-bootstrap";
import { RiStarLine, RiStarFill, RiStarHalfFill } from "react-icons/ri";

export default function StarRating({ value, text }) {
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
    <Stack direction="horizontal" gap={3}>
      <Stack direction="horizontal" gap={2} className="text-primary">
        {stars}
      </Stack>
      {text && text}
    </Stack>
  );
}
