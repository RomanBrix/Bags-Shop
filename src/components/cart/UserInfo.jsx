import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useTranslate from "../../hook/useTranslate";
import { publicRequest } from "../../requestMethods";

export default function UserInfo() {
    const [info, setInfo] = useState({
        name: "",
        secondname: "",
        phone: "",
        address: "",
    });
    const [delivery, setDelivery] = useState("courier");
    const [pay, setPay] = useState("ondelivery");

    const navigate = useNavigate();

    const { getTranslateBlock } = useTranslate();
    const translate = getTranslateBlock("userCart");

    // console.log(translate);
    return (
        <div className="cart user-cart forContainer">
            <div className="container">
                <h1>{translate.header}</h1>
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
                <div className="inputs-radio">
                    <h2>{translate.courier}</h2>
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

    function createOrder() {
        if (!checkInfo()) return;

        const buy = JSON.parse(Cookies.get("buy"));

        // console.log(buy);
        if (pay !== "card") {
            const order = {
                user: { ...info },
                delivery,
                pay,
                status: "new",
            };
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
