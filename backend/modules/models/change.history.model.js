module.exports = (mongoose) => {
  const ChangeHistory = mongoose.model(
    "changeHistory",
    mongoose.Schema(
      {
        id: String,
        prizeId: { type: String },
        changePrice: { type: Number },
      },
      { timestamps: true }
    )
  );
  return Order;
};
