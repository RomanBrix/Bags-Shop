const { default: axios } = require("axios");
const CityOfNp = require("../models/CityOfNp");
const WarehouseOfNp = require("../models/WarehouseOfNp");
const dotenv = require("dotenv");

dotenv.config();

const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

router.get("/city", async (req, res) => {
    const { city, language } = req.query;
    try {
        var regex = new RegExp(city, "i");
    } catch (err) {
        console.log(err);
        return res.status(500).json({ city: "asdasd" });
    }
    try {
        const cities = await CityOfNp.find({
            [`city_${language}`]: { $regex: regex },
        });
        res.status(200).json({ cities });
    } catch (err) {
        res.status(500).json({ city: "asdasd" });
        console.log(err);
    }
});

router.get("/warhouses", async (req, res) => {
    const { warhouse } = req.query;

    try {
        const warhouses = await WarehouseOfNp.find({
            ref: warhouse,
        });

        res.status(200).json({ warhouses });
    } catch (err) {
        res.status(500).json({ city: "asdasd" });
        console.log(err);
    }
});

router.post("/", verifyTokenAndAuthorization, async (req, res) => {
    // const { warehousesToSave, citiesToSave } = req.body;
    // console.log(warehousesToSave.length, citiesToSave.length);
    // console.log(warehousesToSave)

    await CityOfNp.deleteMany({});
    await WarehouseOfNp.deleteMany({});

    // return res.status(200).json({ warhouses: "asdasd" });
    const novaApi = process.env.NOVA_API;
    const novaUrl = process.env.NOVA_API_URL;
    const getCities = {
        apiKey: novaApi,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {},
    };
    const getWarehouses = {
        apiKey: novaApi,
        modelName: "Address",
        calledMethod: "getWarehouses",
    };

    try {
        const [citiesData, warehousesData] = await Promise.allSettled([
            axios.post(novaUrl, getCities),
            axios.post(novaUrl, getWarehouses),
        ]);
        const cities = citiesData.value.data.data;
        const warehouses = warehousesData.value.data.data;
        // console.log(warehouses);

        const citiesToSave = cities.map((city) => ({
            area_ua: city.AreaDescription,
            area_ru: city.AreaDescriptionRu,
            city_ua: city.Description,
            city_ru: city.DescriptionRu,
            settlementType_ua: city.SettlementTypeDescription,
            settlementType_ru: city.SettlementTypeDescriptionRu,
            ref: city.Ref,
        }));
        const warehousesToSave = warehouses.map((warehouse) => ({
            city_ua: warehouse.CityDescription,
            city_ru: warehouse.CityDescriptionRu,

            warehouse_ua: warehouse.Description,
            warehouse_ru: warehouse.DescriptionRu,
            ref: warehouse.CityRef,
        }));
        // console.log(warehousesToSave);
        console.log("City length: " + citiesToSave.length);
        console.log("WarehousesToSave length: " + warehousesToSave.length);

        await CityOfNp.insertMany(citiesToSave);
        await WarehouseOfNp.insertMany(warehousesToSave);

        res.status(200).json({ warhouses: "asdasd" });
        // protectedRequest.post("/np/", { citiesToSave, warehousesToSave });
    } catch (err) {
        toast.error("Ошибка. Обратитесь к прогеру");
        res.status(500).json({ warhouses: "asdasd" });
    }
});

module.exports = router;
