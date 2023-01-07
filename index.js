const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productsRoute = require("./routes/products");

// const axios = require("axios");
// const CryptoJS = require("crypto-js");
// const fs = require('fs')

//modelsControl

//const axios = require("axios");

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;
const CLIENT_CORS_URL = process.env.CLIENT_CORS_URL || "*";
const CLIENT_CORS_METHODS = process.env.CLIENT_CORS_METHODS || "GET,POST";

//app.set("trust proxy", true);
app.use(
    cors({
        origin: CLIENT_CORS_URL,
        methods: CLIENT_CORS_METHODS,
    })
);
app.use(express.json());

const server = http.createServer(app);

mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connected!"))
    .catch((err) => {
        console.log(err);
    });

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/products", productsRoute);

// app.post("/", async (req, res) => {
//     console.log("POOOOOOOST");
//     console.log("req.params");
//     console.log(req.params);

//     console.log("req.query");
//     console.log(req.query);

//     console.log("req.body");
//     console.log(req.body);
// });

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

server.listen(PORT, () => {
    console.log("Backend server is running! port:  *:" + PORT);
});
