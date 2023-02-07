const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WarehouseOfNpSchema = new Schema(
    {
        city_ua: { type: String },
        city_ru: { type: String },

        warehouse_ua: { type: String },
        warehouse_ru: { type: String },
        ref: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("WarehouseOfNp", WarehouseOfNpSchema);
