const dbConfig = require("../configs/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.priceData = require("./prize.data.model.js")(mongoose);
db.changeHistory = require("./change.history.model.js")(mongoose);
module.exports = db;
