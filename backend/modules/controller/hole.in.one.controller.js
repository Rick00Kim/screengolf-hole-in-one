const db = require("../models");
const PrizeData = db.prizeData;
const ChangeHistory = db.changeHistory;

// Create and Save a new holeInOne data.
exports.create = async (req, res) => {
  // Get name from request parameters for check
  const initPrice = req.body.initPrice;

  // Create a Prize data
  const prizeData = new PrizeData({
    initPrice: initPrice,
    currentPrice: initPrice,
  });

  // Save Prize data
  await prizeData.save().then((data) => {
    res.send(data);
  });
};

// Retrieve all holeInOne datas.
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

// Find a latest holeInOne data.
exports.findLatest = (req, res) => {
  // Get latest Prize data
  PrizeData.find({ finishedFlg: false })
    .sort({ createdAt: -1 })
    .limit(1)
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        result: "FAIL",
        message: err.message,
      });
    });
};

// Find a specific Prize datas with an id
exports.findOne = (req, res) => {
  // Get id from request
  const id = req.params.id;

  // Get Prize data by id
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

// Update a Prize data by the id in the request
exports.update = async (req, res) => {
  // Validate requests
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

  // Create change history object
  const changeHistory = new ChangeHistory({
    prizeId: id,
    changePrice: changePrice,
  });

  // Save change history object
  await changeHistory.save();

  // Update Prize data
  const updatedPrize = {
    currentPrice: targetPrizeData.currentPrice + changePrice,
    participantCnt: targetPrizeData.participantCnt + 1,
  };

  // Update Prize data by id
  await PrizeData.findByIdAndUpdate(id, updatedPrize, {
    useFindAndModify: true,
  });

  // Get Prize data by id
  await PrizeData.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          result: "FAIL",
          message: `Cannot update Prize Data with id=${id}. Maybe Prize Data was not found!`,
        });
      } else {
        console.log(data);
        res.send({
          result: "SUCCESS",
          message: "Prize Data was updated successfully.",
          updatedAmount: data.currentPrice,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        result: "FAIL",
        message: "Error updating Prize Data with id=" + id,
      });
    });
};

// Confirm a specific Prize data
exports.confirm = async (req, res) => {
  // Get id from request
  const id = req.params.id;
  // Update Prize data by id
  await PrizeData.findByIdAndUpdate(id, { finishedFlg: true })
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
