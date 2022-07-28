module.exports = (mongoose) => {
  const Price = mongoose.model(
    "prizeData",
    mongoose.Schema(
      {
        id: String,
        initPrice: { type: Number },
        currentPrice: { type: Number },
        participantCnt: { type: Number },
        finishedFlg: { type: Boolean },
      },
      { timestamps: true }
    )
  );
  return Price;
};
