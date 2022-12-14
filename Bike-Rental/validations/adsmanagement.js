const Joi = require("joi");

const adsmanagementSchema = Joi.object({
  ad_name: Joi.string().max(30),
  shop_id: Joi.number(),
  banner_image: Joi.string(),
  description: Joi.string()
    .min(10)
    .message("Description must be completed at least 10 characters"),
  start_date: Joi.date().greater("now"),
  end_date: Joi.date(),
  ad_location: Joi.boolean().default(false),
  amount: Joi.number(),
  user_id: Joi.number(),
});

module.exports = adsmanagementSchema;
