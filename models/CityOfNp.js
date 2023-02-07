const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CityOfNpSchema = new Schema(
    {
        area_ua: { type: String },
        area_ru: { type: String },
        city_ua: { type: String },
        city_ru: { type: String },
        settlementType_ua: { type: String },
        settlementType_ru: { type: String },
        ref: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("CityOfNp", CityOfNpSchema);
