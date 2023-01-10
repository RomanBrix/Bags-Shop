const Product = require("../models/Product");
const fileUpload = require("express-fileupload");

const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

const pathToFile = "../sumki/public";

router.post(
    "/",
    verifyTokenAndAuthorization,
    fileUpload(),
    async (req, res) => {
        // console.log("req.body");
        // console.log(req.body);
        // console.log("req.query");
        // console.log(req.query);
        // console.log("req.files");
        // console.log(req.files);

        const product = JSON.parse(req.body.product);

        // console.log(req.files);
        if (req.files) {
            for (const image in req.files) {
                const pathForName = "/src/productImg/";
                req.files[image].mv(
                    pathToFile + pathForName + req.files[image].name
                );
                product.imgs.push(pathForName + req.files[image].name);
            }
        }

        if (product?._id) {
            //change
            console.log("change");

            try {
                await Product.findByIdAndUpdate(product._id, { $set: product });
                res.status(200).json({ status: true });
            } catch (e) {
                console.log(e);
                res.status(500).json({ status: false });
            }
        } else {
            try {
                const newProduct = new Product(product);
                await newProduct.save();
                console.log(newProduct);
                // await newProduct.save();
                res.status(200).json({ status: true, id: newProduct._id });
            } catch (e) {
                console.log(e);
                res.status(500).json({ status: false });
            }
        }
    }
);

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ status: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false });
    }
});

router.get("/one/:id", async (req, res) => {
    const { id } = req.params;
    // console.log(req.params);
    // console.log(req.query);
    if (!id) {
        res.status(500).json({ status: false });
    } else {
        try {
            const product = await Product.findById(id);
            console.log(product);
            if (product) {
                res.status(200).json({ status: true, product });
            } else {
                throw new Error();
            }
        } catch (err) {
            res.status(500).json({ status: false });
        }
    }
    // const
});

module.exports = router;
