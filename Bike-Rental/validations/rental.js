const Joi = require("joi");

const rentalSchema = Joi.object({
  bike_id: Joi.number(),
  client_id: Joi.number(),
  rental_start_date: Joi.date().greater("now"),
  rental_end_date: Joi.date(),
  total_amount: Joi.number(),
  payment_status: Joi.boolean().default(false),
  rental_status: Joi.boolean().default(false),
  remarks: Joi.string(),
  user_id: Joi.number(),
});

module.exports = rentalSchema;
