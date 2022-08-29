module.exports = {
  url: `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DATABASE_HOST}:27017/${process.env.DB_DATABASE}`,
};
