const Order = require("../models/Order");

// const Filters = require("../models/Filters");
const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

router.post("/", async (req, res) => {
    // console.log(req.body);
    const { order } = req.body;

    if (!order) return res.status(500).json({ status: false });

    const id = generatePassword();
    const newOrder = new Order({ ...order, id });

    try {
        await newOrder.save();
        res.status(200).json({ status: true, id });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false });
    }
});

function generatePassword(length = 5, number = true) {
    let generatedPassword = "";
    let variationsCount = [number].length;

    for (let i = 0; i < length; i += variationsCount) {
        if (number) {
            generatedPassword += getRandomNumber();
        }
        generatedPassword += getRandomLower();
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

module.exports = router;
