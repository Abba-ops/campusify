/**
 * Middleware to handle 404 Not Found errors.
 * Passes an error to the next middleware with a 404 status and a message indicating the not found resource.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Global error handler middleware.
 * Handles various types of errors and sends an appropriate JSON response.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Handle specific error type: CastError for invalid ObjectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  // Send JSON response with error details
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV !== "production" ? err.stack : "🥞",
  });
};

export { notFound, errorHandler };
