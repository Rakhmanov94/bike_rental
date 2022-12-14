const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9]+$/))
    .message("Username must contain only letters and numbers")
    .min(3)
    .message("Username must be at least 3 characters")
    .max(30)
    .message("Username must contain maximum 30 characters")
    .required(),
  password: Joi.string()
    .required(),
  avatar: Joi.string(),
  fullname: Joi.string()
    .max(50)
    .message("Fullname must contain maximum 50 characters")
    .required(),
  contact: Joi.string()
    .pattern(new RegExp(/\d{2}-\d{3}-\d{2}-\d{2}$/))
    .message("Example phone: 99-123-45-67")
    .max(15)
    .message("Phone number must contain maximum 15 characters")
    .required(),
  email: Joi.string()
    .email()
    .message("Email must contain maximum 30 characters"),
  user_category_id: Joi.boolean().default(false),
  status: Joi.boolean().default(false),
});

module.exports = userSchema;
