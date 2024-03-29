const dbConfig = require("../configs/db.config.js")
const mongoose = require("mongoose")
mongoose.Promise = global.Promise
const db = {}
// Define mongoose and set configs
db.mongoose = mongoose
db.url = dbConfig.url
db.prizeData = require("./prize.data.model.js")(mongoose)
db.changeHistory = require("./change.history.model.js")(mongoose)
module.exports = db
