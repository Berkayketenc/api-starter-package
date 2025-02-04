const Joi = require("joi");
const APIError = require("../../utils/errors.js");

class AuthValidation {
  constructor() {}

  static register = async (req, res, next) => {
    try {
      await Joi.object({
        name: Joi.string().trim().min(6).max(50).required().messages({
          "string.base": "The name field must be plain text.",
          "string.empty": "Name field cannot be empty.",
          "string.min": "The name field must be at least 6 characters.",
          "string.max": "The name field can be up to 50 characters..",
          "any.required": "Name field is required.",
        }),
        lastname: Joi.string().trim().min(6).max(50).required().messages({
          "string.base": "The surname field should be normal text.",
          "string.empty": "The surname field cannot be blank.",
          "string.min": "The surname field must be at least 6 characters.",
          "string.max": "The surname field can be up to 50 characters.",
          "any.required": "The surname field is required.",
        }),
        email: Joi.string().email().trim().min(6).max(50).required().messages({
          "string.base": "The Email field must be plain text.",
          "string.email": "Please enter a valid email.",
          "string.empty": "Email field cannot be blank.",
          "string.min": "Email field must be at least 6 characters.",
          "string.max": "The email field can be up to 50 characters.",
          "any.required": "Email field is required.",
        }),
        password: Joi.string().trim().min(6).max(50).required().messages({
          "string.base": "The password field must be plain text.",
          "string.empty": "The password field cannot be blank.",
          "string.min": "The password field must be at least 6 characters.",
          "string.max": "The password field can be up to 50 characters.",
          "any.required": "The password field is required.",
        }),
      }).validateAsync(req.body);

      next();
    } catch (error) {
      return next(new APIError(error.details[0].message, 400));
    }
  };

  static login = async (req, res, next) => {
    try {
      await Joi.object({
        email: Joi.string().email().trim().min(6).max(50).required().messages({
          "string.base": "The Email field must be plain text.",
          "string.email": "Please enter a valid email.",
          "string.empty": "Email field cannot be blank.",
          "string.min": "Email field must be at least 6 characters.",
          "string.max": "The email field can be up to 50 characters.",
          "any.required": "Email field is required.",
        }),
        password: Joi.string().trim().min(6).max(50).required().messages({
          "string.base": "The password field must be plain text.",
          "string.empty": "Password field cannot be empty.",
          "string.min": "The password field must be at least 6 characters.",
          "string.max": "The password field can be up to 50 characters.",
          "any.required": "Password field is required.",
        }),
      }).validateAsync(req.body);

      next();
    } catch (error) {
      return next(new APIError(error.details[0].message, 400));
    }
  };
}

module.exports = AuthValidation;
