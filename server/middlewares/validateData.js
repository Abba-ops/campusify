import {
  loginSchema,
  registrationSchema,
  reviewSchema,
} from "../validators/userValidator.js";

/**
 * Middleware to validate request body against a specified Joi schema.
 * Throws a 400 Bad Request error with the first validation error message if validation fails.
 */
const validateSchema = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body, {
      abortEarly: false,
    });

    if (validationResult.error) {
      const errorMessages = validationResult.error.details.map(
        (detail) => detail.message
      );

      res.status(400);
      throw new Error(errorMessages[0]);
    }

    next();
  };
};

const validateRegister = validateSchema(registrationSchema);
const validateLogin = validateSchema(loginSchema);
const validateReview = validateSchema(reviewSchema);

export { validateRegister, validateLogin, validateReview };
