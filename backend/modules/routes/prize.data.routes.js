const validators = require("../utilities/validators");
const CommonValidate = validators.CommonValidate;
const PrizeDataPostValidationRule = validators.PrizeDataPostValidationRule;
const ParamIdValidationRules = validators.ParamIdValidationRules;

module.exports = (app) => {
  // Import Order controller
  const orderController = require("../controllers/order.controller.js");

  // Define router
  var router = require("express").Router();

  // Create a new Order
  router.post(
    "/",
    PrizeDataPostValidationRule(),
    CommonValidate,
    orderController.create
  );

  // Retrieve all Orders.
  router.get("/", orderController.findAll);

  // Find a specific Order with an id
  router.get(
    "/:id",
    ParamIdValidationRules(),
    CommonValidate,
    orderController.findOne
  );

  // Update a Order with id
  router.put(
    "/:id",
    ParamIdValidationRules(),
    CommonValidate,
    orderController.update
  );

  app.use("/api/prize-data", router);
};
