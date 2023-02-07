const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productsRoute = require("./routes/products");
const filtersRoute = require("./routes/filters");
const checkRoute = require("./routes/check");
const orderRoute = require("./routes/order");
const npRoute = require("./routes/np");

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
app.use("/api/filters", filtersRoute);
app.use("/api/check", checkRoute);
app.use("/api/order", orderRoute);
app.use("/api/np", npRoute);

/*
file upload 
app.use(express.json({limit: '90mb'}));
app.use(fileUpload());  = npm


router.post("/new", verifyAdmin, async (req, res) => {
   
    const  { image } = req.files;
    let  { product }  = req.body;
    console.log()
    if(image){
        product = JSON.parse(product);
    if (!(/^image/.test(image.mimetype))) return res.sendStatus(400);
        image.mv(pathToPublicProducts + image.name);
        product.image = image.name;
    }

    console.log(product)
    const prod = await addProduct(product)
    
    
    res.status(200).json(prod);
});
*/

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
