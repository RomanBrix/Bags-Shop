const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        title: { type: String, required: true },
        brand: { type: String },
        type: {
            ua: { type: String },
            ru: { type: String },
        },
        about: {
            ua: { type: String },
            ru: { type: String },
        },
        imgs: [],
        variants: [
            {
                color: {
                    type: String,
                    default: "",
                },
                price: { type: Number, default: 1 },
                discount: { type: Number, default: null },
                discount_on: { type: Boolean, default: false },
                imgIndex: { type: Number, default: 0 },
            },
        ],
        params: { type: String, default: "20/14/7" },
        material: {
            ua: { type: String, default: null },
            ru: { type: String, default: null },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
