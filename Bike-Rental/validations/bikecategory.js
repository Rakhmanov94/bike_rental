const Joi = require("joi");

const bikeCategorySchema = Joi.object({
  category_name: Joi.string()
    .max(30)
    .message("Category name must not be longer than 30 characters"),
  description: Joi.string()
    .min(10)
    .message("Description must be completed at least 10 characters"),
});

module.exports = bikeCategorySchema;
