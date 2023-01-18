const Order = require("../models/Order");

// const Filters = require("../models/Filters");
const { verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

router.post("/status", verifyTokenAndAuthorization, async (req, res) => {
    const { id, status } = req.body;

    try {
        await Order.findByIdAndUpdate(id, { status: status });
        res.status(200).json({ status: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false });
    }
});
router.get("/all", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
        res.status(200).json({ status: true, orders });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false });
    }
});

router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
    const { id } = req.params;
    if (!id) res.status(500).json({ status: false });
    // console.log(req.params);
    try {
        const order = await Order.findById(id).sort({ createdAt: -1 }).lean();
        res.status(200).json({ status: true, order });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false });
    }
});

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
