import jwt from "jsonwebtoken";

/**
 * Generates a JWT token and sets it as a cookie in the response.
 * @param {object} res - Express response object.
 * @param {string} userId - User ID to be included in the token payload.
 */
export default function genToken(res, userId) {
  // Generate JWT token with user ID payload
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Set to 30 days
  });

  // Set the JWT token as a cookie in the response
  res.cookie("jwt_token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days expiration
    secure: process.env.NODE_ENV !== "development",
  });
}
