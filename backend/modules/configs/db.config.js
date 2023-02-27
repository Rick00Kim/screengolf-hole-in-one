module.exports = {
  url: `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:27017/${process.env.DB_DATABASE}`,
}
