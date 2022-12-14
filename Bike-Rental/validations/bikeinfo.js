const Joi = require("joi");

const bikeInfoSchema = Joi.object({
  bike_category_id: Joi.number(),
  shop_id: Joi.number(),
  bike_name: Joi.string(),
  specs: Joi.string(),
  rent_price: Joi.number(),
  availability: Joi.boolean().default(false),
  user_id: Joi.number(),
});

module.exports = bikeInfoSchema;
