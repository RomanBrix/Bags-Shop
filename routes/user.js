const User = require("../models/Admin");
const CryptoJS = require("crypto-js");

const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

router.post("/add", verifyTokenAndAuthorization, async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        isAdmin: req.body.isAdmin || true,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    });

    try {
        await newUser.save();
        res.status(201).json({ status: true });
    } catch (err) {
        res.status(500).json({ status: false, err });
    }
});
//UPDATE
router.put("/change/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json({ status: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

//ADMIN UPDATE
router.put("/admin/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        const { password, ...others } = updatedUser._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: true });
    } catch (err) {
        res.status(500).json({ status: false, err });
    }
});

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    // console.log('asdasd');
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(200).json({ message: "User not found" });
    }
});

//GET ALL USER
router.get("/", verifyTokenAndAuthorization, async (req, res) => {
    // const query = req.query.new;
    try {
        const users = await User.find({}, "createdAt email isAdmin username")
            .sort({
                createdAt: -1,
            })
            .lean();

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER STATS
//User.aggregate

//get username
router.get("/usernames", verifyTokenAndAdmin, async (req, res) => {
    const ids = req.query.ids;
    console.log(ids);
    try {
        const users = await User.find({ _id: { $in: ids } }, "username");
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
