const { default: mongoose } = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    quantity: { type: Number, required: true },
    offerPrice:{type: Number, required: true},
    accepted: { type: String, default: "pending" },
    canRate: {type: String, default:"pending"}
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
