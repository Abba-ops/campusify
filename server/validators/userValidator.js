import Joi from "joi";

const registrationSchema = Joi.object({
  uniqueId: Joi.string().required().messages({
    "any.required": "Unique ID is required.",
    "string.empty": "Unique ID cannot be empty.",
  }),
  userType: Joi.string().valid("student", "staff").required().messages({
    "any.required": "User type is required.",
    "string.empty": "User type cannot be empty.",
    "any.only": 'Invalid user type. Must be either "student" or "staff".',
  }),
  password: Joi.string()
    .min(8)
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+}{":;'\[\]])/
    )
    .required()
    .messages({
      "any.required": "Password is required.",
      "string.empty": "Password cannot be empty.",
      "string.min": "Password must be at least 8 characters long.",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Invalid email format.",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required.",
    "string.empty": "Password cannot be empty.",
  }),
});

const reviewSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required for the review.",
    "string.empty": "Name cannot be empty.",
  }),
  rating: Joi.number().required().messages({
    "any.required": "Rating is required for the review.",
    "number.base": "Rating must be a number.",
  }),
  comment: Joi.string().required().messages({
    "any.required": "Comment is required for the review.",
    "string.empty": "Comment cannot be empty.",
  }),
}).options({ abortEarly: false });

export { registrationSchema, loginSchema, reviewSchema };
