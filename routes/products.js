const Product = require("../models/Product");

const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

router.post("/", verifyTokenAndAuthorization, async (req, res) => {
    const newProduct = new Product({
        title: "Product 1",
        about: {
            ua: "ua",
            ru: "ru",
        },
        brand: "brand",
        type: "bag",
        imgs: ["1.jpg", "2jpg", "3jpg"],
        variants: [
            {
                color: "Черный",
                price: 25,
                imgIndex: 0,
            },
            {
                color: "Красный",
                price: 235,
                imgIndex: 1,
            },
            {
                color: "Серый",
                price: 225,
                imgIndex: 2,
            },
        ],
        params: "20/14/7",
    });

    try {
        await newProduct.save();
        res.status(200).json({ status: true });
    } catch (e) {
        console.log(e);
        res.status(500).json({ status: false });
    }
});

module.exports = router;
