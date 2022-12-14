const Joi = require("joi");

const userGroupSchema = Joi.object({
  group_name: Joi.string()
    .max(30)
    .message("Group name must contain maximum 30 characters"),
  description: Joi.string()
    .min(10)
    .message("Description must contain minimum 10 characters")
    .max(100)
    .message("Description must contain maximum 100 characters"),
  allow_add: Joi.boolean().default(false),
  allow_edit: Joi.boolean().default(false),
  allow_delete: Joi.boolean().default(false),
  allow_print: Joi.boolean().default(false),
  allow_import: Joi.boolean().default(false),
  allow_export: Joi.boolean().default(false),
});

module.exports = userGroupSchema;
