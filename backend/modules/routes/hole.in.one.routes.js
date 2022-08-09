const validators = require("../utilities/hole.in.one.validators");
const CommonValidate = validators.CommonValidate;
const ParamIdValidationRules = validators.ParamIdValidationRules;
const CreateValidationRule = validators.CreateValidationRule;
const ModifyValidationRules = validators.ModifyValidationRules;

module.exports = (app) => {
  // Import Order controller
  const holeInOneController = require("../controller/hole.in.one.controller.js");

  // Define router
  var router = require("express").Router();

  // Create a new holeInOne data
  router.post(
    "/",
    CreateValidationRule(),
    CommonValidate,
    holeInOneController.create
  );

  // Retrieve all holeInOne datas.
  router.get("/", holeInOneController.findAll);

  // Find a latest holeInOne data.
  router.get("/latest", holeInOneController.findLatest);

  // Find a specific holeInOne data with an id
  router.get(
    "/:id",
    ParamIdValidationRules(),
    CommonValidate,
    holeInOneController.findOne
  );

  // Update a holeInOne data with id
  router.put(
    "/:id",
    ModifyValidationRules(),
    CommonValidate,
    holeInOneController.update
  );

  app.use("/api/hole-in-one", router);
};
