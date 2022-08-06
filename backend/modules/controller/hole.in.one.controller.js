const db = require("../models");
const PriceData = db.priceData;
const ChangeHistory = db.changeHistory;

// Create and Save a new price data.
exports.create = async (req, res) => {
  // Get name from request parameters for check
  const initPrice = req.body.initPrice;

  // Create a Price data
  const priceData = new PriceData({
    initPrice: initPrice,
    currentPrice: initPrice,
  });

  // Save Price data
  await priceData.save().then((data) => {
    res.send(data);
  });
};

// Retrieve all Price datas.
exports.findAll = (req, res) => {
  PriceData.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Find a specific Price datas with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  PriceData.findById(id)
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

// Update a Price data by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      result: "FAIL",
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  PriceData.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
