module.exports = (mongoose) => {
  const Price = mongoose.model(
    "prizeData",
    mongoose.Schema(
      {
        id: String,
        initPrice: { type: Number },
        currentPrice: { type: Number },
        participantCnt: { type: Number, default: 0 },
        finishedFlg: { type: Boolean, default: false },
      },
      { timestamps: true }
    )
  )
  return Price
}
