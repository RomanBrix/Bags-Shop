const Product = require("../models/Product");
const fileUpload = require("express-fileupload");
const extract = require("extract-zip");
var path = require("path");
// const { parse } = require("csv-parse");
const { parse } = require("csv-parse/sync");
const fs = require("fs");

const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

const pathToFile = "../Bags-Shop/public";
const pathForName = "/src/productImg/";

router.post(
    "/manyphotos",
    verifyTokenAndAuthorization,
    fileUpload(),
    async (req, res) => {
        console.log(req.files);
        if (!req.files.photos) return res.status(500).json(false);
        const saveName = "./" + req.files.photos.name;
        // extractZip()
        try {
            //save file
            console.log("save file");
            await req.files.photos.mv(saveName);
            //extract file items
            console.log("extract");
            const status = await extractZip(saveName);
            //remove file
            console.log("delete file");
            fs.unlinkSync(saveName);

            if (!status) throw new Error();

            res.status(200).json({ status: true });
        } catch (err) {
            console.log(err);
            res.status(500).json(false);
        }
        // res.status(200).json({ status: true });
    }
);

router.post(
    "/manyproducts",
    verifyTokenAndAuthorization,
    fileUpload(),
    async (req, res) => {
        if (!req.files.csv) return res.status(500).json(false);

        const saveName = "./" + req.files.csv.name;

        try {
            //save file
            console.log("save file");
            await req.files.csv.mv(saveName);
            //read file and get data for save in db
            const productsForSave = await readCsvFile(saveName);
            console.log("save products");
            await Product.insertMany(productsForSave);
            //remove file
            console.log("delete file");
            fs.unlinkSync(saveName);
            res.status(200).json({ status: true });
        } catch (err) {
            console.log(err);
            res.status(500).json(false);
        }
    }
);

router.post(
    "/",
    verifyTokenAndAuthorization,
    fileUpload(),
    async (req, res) => {
        const product = JSON.parse(req.body.product);

        // console.log(req.files);
        if (req.files) {
            for (const image in req.files) {
                if (!/^image/.test(req.files[image].mimetype))
                    return res.sendStatus(503);

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
                // console.log(newProduct);
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
            // console.log(product);
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

router.get("/all", async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 }).lean();

        if (products) {
            res.status(200).json({ status: true, products });
        } else {
            res.status(200).json({ status: false });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

async function readCsvFile(file) {
    const content = fs.readFileSync(file, "utf8");

    const output = await parse(content, { columns: true });

    return output.map((item) => {
        const product = {
            title: item.title,
            brand: item.brand,
            type: {
                ua: item.type_ua,
                ru: item.type_ru,
            },
            about: {
                ua: item?.about_ua || "",
                ru: item?.about_ru || "",
            },
            params: item.params,
            material: item?.material || null,
            imgs: item.imgs.split(",").map((item) => pathForName + item),
        };

        const variants = [];
        for (const key in item) {
            if (key.includes("variant")) {
                if (item[key].length > 0) {
                    let keys = key.split("_");

                    //ЭТО НЕ ПРАВИЛЬНО ПЕРЕДЕЛАТЬ... долбоеб
                    if (variants[keys[1] - 1]) {
                        variants[keys[1] - 1][keys[2]] =
                            keys[2] !== "color" ? +item[key] : item[key];
                    } else {
                        variants.push({
                            [keys[2]]:
                                keys[2] !== "color" ? +item[key] : item[key],
                        });
                    }
                }
            }
        }

        return {
            ...product,
            variants,
        };
    });
}

async function extractZip(file) {
    console.log(path.resolve(pathToFile + pathForName + "/"));
    try {
        await extract(file, {
            dir: path.resolve(pathToFile + pathForName + "/"),
        });
        return true;
    } catch (err) {
        console.log(err);
        return false;
        // handle any errors
    }
}

module.exports = router;
