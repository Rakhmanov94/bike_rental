const Joi = require("joi");

const penaltySchema = Joi.object({
  rental_id: Joi.number(),
  penalty_amount: Joi.number(),
  payment_status: Joi.boolean().default(false),
  remarks: Joi.string(),
  paid_by: Joi.string(),
  user_id: Joi.number(),
});

module.exports = penaltySchema;
