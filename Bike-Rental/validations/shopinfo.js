const Joi = require("joi");

const shopinfoSchema = Joi.object({
  shop_name: Joi.string(),
  owner_name: Joi.string(),
  address: Joi.string(),
  email_address: Joi.string().email(),
  contact_no: Joi.string(),
  website: Joi.string(),
  updated_by: Joi.number(),
});

module.exports = shopinfoSchema;
