const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FiltersBrandSchema = new Schema(
    {
        name: { type: String, required: true },
        products: { type: Schema.Types.ObjectId, ref: "Product" },
    },
    { timestamps: true }
);

const FiltersTypeSchema = new Schema(
    {
        name: {
            ua: { type: String, required: true },
            ru: { type: String, required: true },
        },
        products: { type: Schema.Types.ObjectId, ref: "Product" },
    },
    { timestamps: true }
);

const FiltersBrand = mongoose.model("FiltersBrand", FiltersBrandSchema);
const FiltersType = mongoose.model("FiltersType", FiltersTypeSchema);
module.exports = { FiltersBrand, FiltersType };

// module.exports = mongoose.model("Filters", FiltersSchema);
