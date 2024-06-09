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
const paramIdValidationRules = () => {
  return [param("id").notEmpty().withMessage("ID can not be null")];
};

const createValidationRule = () => {
  return [
    body("initPrice")
      .notEmpty()
      .withMessage("INIT_PRICE can not be null")
      .isNumeric()
      .withMessage("INIT_PRICE should be number"),
  ];
};

const modifyValidationRules = () => {
  return [
    param("id").notEmpty().withMessage("ID can not be null"),
    body("changePrice")
      .notEmpty()
      .withMessage("CHANGE_PRICE can not be null")
      .isNumeric()
      .withMessage("CHANGE_PRICE should be number"),
  ];
};

validators.CommonValidate = validate;
validators.ParamIdValidationRules = paramIdValidationRules;
validators.CreateValidationRule = createValidationRule;
validators.ModifyValidationRules = modifyValidationRules;

module.exports = validators;
