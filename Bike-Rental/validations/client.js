const Joi = require("joi");

const clientSchema = Joi.object({
  client_code: Joi.string(),
  avatar: Joi.string(),
  client_name: Joi.string(),
  email_address: Joi.string().email(),
  contact_number: Joi.string()
    .pattern(new RegExp(/\d{2}-\d{3}-\d{2}-\d{2}$/))
    .message("Example phone: 95-054-15-25"),
  complete_address: Joi.string(),
  username: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9_\.]+$/))
    .message("Username is contain only [a-z][A-z][0-9][._]")
    .min(3).max(15),
  password: Joi.string(),
  status: Joi.boolean().default(false),
});

module.exports = clientSchema;
