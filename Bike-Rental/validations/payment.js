const Joi = require("joi");

const paymentSchema = Joi.object({
  rental_id: Joi.number(),
  payment_type: Joi.number()
    .max(3)
    .message("Payment type must be only 0, 1 or 2"),
  paid_by: Joi.string(),
  payment_date: Joi.date().greater("now"),
  remarks: Joi.string(),
  user_id: Joi.number(),
});

module.exports = paymentSchema
