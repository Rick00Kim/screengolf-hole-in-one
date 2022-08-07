const db = require("../models");
const PrizeData = db.prizeData;
const ChangeHistory = db.changeHistory;

// Create and Save a new price data.
exports.create = async (req, res) => {
  // Get name from request parameters for check
  const initPrice = req.body.initPrice;

  // Create a Price data
  const priceData = new PrizeData({
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
  PrizeData.find()
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
  PrizeData.findById(id)
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

  // Get id from request
  const id = req.params.id;
  // Validate data
  const targetPrizeData = await PrizeData.findById(id);
  if (!targetPrizeData) {
    return res.status(404).send({
      result: "FAIL",
      message: "Praice data is not found",
    });
  }

  // Get changed price from request body
  const changePrice = req.body.changePrice;

  const updatedPrize = {
    currentPrice: targetPrizeData.currentPrice + changePrice,
    participantCnt: targetPrizeData.participantCnt + 1,
  };

  const changeHistory = new ChangeHistory({
    prizeId: id,
    changePrice: changePrice,
  });

  await changeHistory.save();

  await PrizeData.findByIdAndUpdate(id, updatedPrize, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          result: "FAIL",
          message: `Cannot update Prize Data with id=${id}. Maybe Prize Data was not found!`,
        });
      } else
        res.send({
          result: "SUCCESS",
          message: "Prize Data was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        result: "FAIL",
        message: "Error updating Prize Data with id=" + id,
      });
    });
};
