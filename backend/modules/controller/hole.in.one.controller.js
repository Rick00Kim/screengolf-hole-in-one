const db = require("../models");
const PriceData = db.priceData;

// Create and Save a new price data.
exports.create = (req, res) => {
  // Get name from request parameters for check
  const name = req.body.name;
  // Validate existing data from request
  PriceData.find({ name: name }, function (err, result) {
    if (err) {
      return res.json(err);
    } else {
      if (result.length !== 0) {
        return res.status(200).json({
          result: "FAIL",
          message: `Regular Name(${name}) is already exists.`,
        });
      } else {
        // Create a Regular
        const priceData = new PriceData({
          name: name,
          number: req.body.number,
          key: req.body.key,
          amount: req.body.amount,
        });

        // Save Regular in the database
        priceData
          .save()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              result: "FAIL",
              message:
                err.message ||
                "Some error occurred while creating the Regular data.",
            });
          });
      }
    }
  });
};

// Retrieve all menus.
exports.findAll = (req, res) => {
  Menu.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Find a specific menu with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Menu.findById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        result: "FAIL",
        message: err.message,
      });
    });
};

// Update a menu by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      result: "FAIL",
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Menu.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          result: "FAIL",
          message: `Cannot update Menu with id=${id}. Maybe Menu was not found!`,
        });
      } else
        res.send({
          result: "SUCCESS",
          message: "Menu was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        result: "FAIL",
        message: "Error updating Menu with id=" + id,
      });
    });
};

// Delete a menu with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Menu.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          result: "FAIL",
          message: `Cannot delete Menu with id=${id}. Maybe Menu was not found!`,
        });
      } else {
        res.send({
          result: "SUCCESS",
          message: "Menu was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        result: "FAIL",
        message: `Could not delete Menu with id=${id}`,
      });
    });
};
