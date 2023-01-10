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
                imgIndex: { type: Number, default: 0 },
            },
        ],
        params: { type: String, default: "20/14/7" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
