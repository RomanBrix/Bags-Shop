const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);
