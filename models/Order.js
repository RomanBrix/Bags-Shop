const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        user: { type: mongoose.Schema.Types.Mixed },
        delivery: { type: String },
        pay: { type: String },
        products: { type: mongoose.Schema.Types.Mixed },
        id: { type: String, unique: true },
        status: { type: String, default: "new" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
