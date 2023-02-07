import Cookies from "js-cookie";
import { useState } from "react";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useTranslate from "../../hook/useTranslate";
import { publicRequest } from "../../requestMethods";
import Select from "react-select";
import { useEffect } from "react";

export default function UserInfo() {
    const [info, setInfo] = useState({
        name: "",
        secondname: "",
        phone: "",
        address: "",
    });
    const [delivery, setDelivery] = useState("courier");
    const [pay, setPay] = useState("ondelivery");

    const [isLoadingNp, setIsLoading] = useState(false);
    const [listCitiesNp, setListCitiesNp] = useState([]);
    const [listWarhousesNp, setWarhousesNp] = useState([]);

    const [selectedCityNp, setSelectedCityNp] = useState(null);
    const [selectedWarehouseNp, setSelectedWarehouseNp] = useState(null);

    useEffect(() => {
        console.log(selectedCityNp);
        if (selectedCityNp) {
            //load warhaose
            publicRequest
                .get("/np/warhouses", {
                    params: { warhouse: selectedCityNp.value },
                })
                .then(({ data }) => {
                    // console.log(data);
                    // console.log( );
                    if (data.warhouses.length > 0) {
                        // console.log(data.warhouses);
                        setWarhousesNp(
                            data.warhouses.map((item) => ({
                                ...item,
                                value: item.ref,
                                label: item[`warehouse_${language}`],
                            }))
                        );
                    }
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Ошибка");
                });
        } else {
            setWarhousesNp([]);
            setSelectedWarehouseNp(null);
        }
    }, [selectedCityNp]);
    // console.log(listWarhousesNp);
    const navigate = useNavigate();

    const { getTranslateBlock, language } = useTranslate();
    const translate = getTranslateBlock("userCart");

    // console.log(translate);
    return (
        <div className="cart user-cart forContainer">
            <div className="container">
                <div className="inputs-radio">
                    <h2>{translate.deliveryMethod}</h2>
                    <div className="radio">
                        <label htmlFor="courier">{translate.courier}</label>
                        <input
                            type="radio"
                            name="delivery"
                            id="courier"
                            value="courier"
                            checked={delivery === "courier"}
                            onChange={changeDelivery}
                        />
                    </div>
                    <div className="radio">
                        <label htmlFor="np">{translate.np}</label>
                        <input
                            type="radio"
                            name="delivery"
                            id="np"
                            value="np"
                            checked={delivery === "np"}
                            onChange={changeDelivery}
                        />
                    </div>
                    <div className="radio">
                        <label htmlFor="own">{translate.own}</label>
                        <input
                            type="radio"
                            name="delivery"
                            id="own"
                            value="own"
                            checked={delivery === "own"}
                            onChange={changeDelivery}
                        />
                    </div>
                </div>

                <h2>{translate.header}</h2>
                <div className="inputs">
                    <input
                        type="text"
                        id="name"
                        placeholder={translate.name}
                        value={info.name}
                        onChange={changeInfo}
                    />
                    <label htmlFor="name">{translate.name}</label>
                </div>
                <div className="inputs">
                    <input
                        type="text"
                        id="secondname"
                        placeholder={translate.secondname}
                        value={info.secondname}
                        onChange={changeInfo}
                    />
                    <label htmlFor="secondname">{translate.secondname}</label>
                </div>
                <div className="inputs">
                    <input
                        type="text"
                        id="phone"
                        placeholder={translate.phone}
                        value={info.phone}
                        onChange={changeInfo}
                    />
                    <label htmlFor="phone">{translate.phone}</label>
                </div>
                {delivery !== "np" && (
                    <div className="inputs">
                        <input
                            type="text"
                            id="address"
                            placeholder={translate.address}
                            value={info.address}
                            onChange={changeInfo}
                        />
                        <label htmlFor="address">{translate.address}</label>
                    </div>
                )}

                {delivery === "np" && (
                    <div className="inputs">
                        <Select
                            className="np-input"
                            classNamePrefix="select"
                            // defaultValue={colourOptions[0]}
                            isLoading={isLoadingNp}
                            isClearable={true}
                            isSearchable={true}
                            name="cities"
                            placeholder={language === "ua" ? "Місто" : "Город"}
                            noOptionsMessage={() =>
                                language === "ua"
                                    ? "Почніть вводити назву вашого міста"
                                    : "Начните вводить название вашего города"
                            }
                            options={listCitiesNp}
                            onChange={selectCityOfNp}
                            onInputChange={getCitiesOfNp}
                        />

                        <Select
                            className="np-input"
                            classNamePrefix="select"
                            // defaultValue={colourOptions[0]}
                            isLoading={isLoadingNp}
                            isClearable={true}
                            isSearchable={true}
                            name="cities"
                            placeholder={
                                language === "ua" ? "Відділення" : "Отделение"
                            }
                            noOptionsMessage={() =>
                                language === "ua"
                                    ? "Виберіть місто"
                                    : "Выберите город"
                            }
                            options={listWarhousesNp}
                            onChange={selectWarehouseOfNp}
                        />
                    </div>
                )}

                <div className="inputs-radio">
                    <h2>{translate.payMethod}</h2>
                    <div className="radio">
                        <label htmlFor="card">{translate.card}</label>
                        <input
                            type="radio"
                            name="pay"
                            id="card"
                            value="card"
                            checked={pay === "card"}
                            onChange={changePay}
                        />
                    </div>
                    <div className="radio">
                        <label htmlFor="ondelivery">
                            {translate.ondelivery}
                        </label>
                        <input
                            type="radio"
                            name="pay"
                            id="ondelivery"
                            value="ondelivery"
                            checked={pay === "ondelivery"}
                            onChange={changePay}
                        />
                    </div>
                </div>
                <button onClick={createOrder}>{translate.btn}</button>
            </div>
        </div>
    );

    function selectWarehouseOfNp(val) {
        // console.log(val);
        setSelectedWarehouseNp(val);
    }
    function selectCityOfNp(val) {
        // console.log(val);
        setSelectedCityNp(val);
    }

    function getCitiesOfNp(val) {
        if (val.length < 3) {
            setListCitiesNp([]);
        } else {
            setIsLoading(true);
            publicRequest
                .get("/np/city", { params: { city: val, language } })
                .then(({ data }) => {
                    if (data.cities.length > 0) {
                        setListCitiesNp(
                            data.cities.map((item) => ({
                                value: item.ref,
                                label: item[`city_${language}`],
                            }))
                        );
                    } else {
                        setListCitiesNp([]);
                    }
                    setIsLoading(false);
                    // console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        // console.log(val);
    }

    function createOrder() {
        if (!checkInfo()) return;

        // console.log(delivery);
        // console.log(selectedCityNp);
        // console.log(selectedWarehouseNp);
        const userForOrder = {
            ...info,
        };

        if (delivery === "np") {
            userForOrder.address =
                selectedWarehouseNp.city_ua +
                " " +
                selectedWarehouseNp.warehouse_ua;
        }
        // return "";
        const buy = JSON.parse(Cookies.get("buy"));
        // console.log(buy);
        if (pay !== "card") {
            const order = {
                user: { ...userForOrder },
                delivery,
                pay,
                status: "new",
            };

            // console.log(order);
            // return;
            let products = [];
            for (const key in buy) {
                const productInfo = {
                    ...buy[key],
                    id: key,
                };
                const variants = [];

                for (const variant in buy[key].variants) {
                    variants.push({
                        ...buy[key].variants[variant],
                    });
                }

                products = [...products, { ...productInfo, variants }];
            }

            // console.log(products);
            publicRequest
                .post("/order", {
                    order: {
                        ...order,
                        products,
                    },
                })
                .then((res) => {
                    // console.log(res.data);
                    if (res.data.status) {
                        toast.success(translate.alerts.ok);
                        toast.success(translate.alerts.orderId + res.data.id, {
                            autoClose: 15000,
                        });
                        setInfo({
                            name: "",
                            secondname: "",
                            phone: "",
                            address: "",
                        });
                        Cookies.set("buy", JSON.stringify({}));
                        // navigate to thank page
                        navigate(`/success?id=${res.data.id}`);
                    } else {
                        toast.warning(translate.alerts.warn);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(translate.alerts.error);
                });
        } else {
            toast.warning(translate.alerts.cardError);
        }
    }

    function checkInfo() {
        if (info.name.length < 3) {
            toast.warning(translate.alerts.name);
            return false;
        }
        if (info.secondname.length < 3) {
            toast.warning(translate.alerts.secName);
            return false;
        }
        if (info.phone.length < 9) {
            toast.warning(translate.alerts.address);
            return false;
        }
        if (delivery !== "np" && info.address.length < 5) {
            toast.warning(translate.alerts.phone);
            return false;
        }
        if ((delivery === "np" && !selectedCityNp) || !selectedWarehouseNp) {
            return false;
        }
        return true;
    }

    function changePay({ target }) {
        setPay(target.value);
    }
    function changeDelivery({ target }) {
        // console.log(target);
        setDelivery(target.value);
    }
    function changeInfo({ target }) {
        setInfo((prev) => ({ ...prev, [target.id]: target.value }));
    }
}
