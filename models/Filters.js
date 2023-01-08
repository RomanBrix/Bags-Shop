const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FiltersBrandSchema = new Schema(
    {
        brand: {
            name: { type: String, required: true, unique: true },
            products: { type: Schema.Types.ObjectId, ref: "Product" },
        },
    },
    { timestamps: true }
);

const FiltersTypeSchema = new Schema(
    {
        type: {
            name: { type: String, required: true, unique: true },
            products: { type: Schema.Types.ObjectId, ref: "Product" },
        },
    },
    { timestamps: true }
);

const FiltersBrand = mongoose.model("FiltersBrand", FiltersBrandSchema);
const FiltersType = mongoose.model("FiltersType", FiltersTypeSchema);
module.exports = { FiltersBrand, FiltersType };

// module.exports = mongoose.model("Filters", FiltersSchema);
