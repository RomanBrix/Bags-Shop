const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        about: {},
        imgs: [],
        variants: {
            color: {},
            price: {},
            imgIndex: 0,
        },
        params: {},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
