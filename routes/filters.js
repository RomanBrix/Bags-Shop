const { FiltersType, FiltersBrand } = require("../models/Filters");

// const Filters = require("../models/Filters");
const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

router.get("/", async (req, res) => {
    // console.log(Filters);

    const { type } = req.query;
    // console.log(req.query);

    try {
        switch (type) {
            case "type":
                return res
                    .status(200)
                    .json({ type: await FiltersType.find({}).lean() });

            case "brand":
                return res
                    .status(200)
                    .json({ brand: await FiltersBrand.find({}).lean() });

            default:
                const typeFilters = await FiltersType.find({}).lean();
                const brandFilters = await FiltersBrand.find({}).lean();
                return res
                    .status(200)
                    .json({ brand: brandFilters, type: typeFilters });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, err });
    }
});
router.post("/", verifyTokenAndAuthorization, async (req, res) => {
    // const newProduct = new Product({});
    // try {
    //     await newProduct.save();
    //     res.status(200).json({ status: true });
    // } catch (e) {
    //     console.log(e);
    //     res.status(500).json({ status: false });
    // }
});

module.exports = router;
