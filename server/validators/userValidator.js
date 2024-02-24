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
  password: Joi.string().required().messages({
    "any.required": "Password is required.",
    "string.empty": "Password cannot be empty.",
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
  name: Joi.string().required(),
  rating: Joi.number().required(),
  comment: Joi.string().required(),
}).options({ abortEarly: false });

export { registrationSchema, loginSchema, reviewSchema };
