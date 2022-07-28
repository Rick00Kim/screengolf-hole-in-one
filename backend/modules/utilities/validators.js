const { param, body, validationResult } = require("express-validator");
// Define Validators
const validators = {};

// Common validate function
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const checkedError = [];
  errors.array().map((err) => checkedError.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: checkedError,
  });
};

// Each validation rules
const menuValidationRules = () => {
  return [
    param("id").notEmpty().withMessage("ID can not be null"),
    body("name").notEmpty().withMessage("NAME can not be null"),
    body("amount")
      .notEmpty()
      .withMessage("AMOUNT can not be null")
      .isNumeric()
      .withMessage("AMOUNT should be number"),
  ];
};

validators.CommonValidate = validate;

module.exports = validators;
