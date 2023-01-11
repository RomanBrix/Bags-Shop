const { verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

router.post("/", verifyTokenAndAuthorization, async (req, res) => {
    res.sendStatus(200);
});

module.exports = router;
