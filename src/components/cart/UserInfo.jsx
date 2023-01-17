import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

    return (
        <div className="cart user-cart forContainer">
            <div className="container">
                <h1>Личная информация</h1>
                <div className="inputs">
                    <input
                        type="text"
                        id="name"
                        placeholder="name"
                        value={info.name}
                        onChange={changeInfo}
                    />
                    <label htmlFor="name">Имя</label>
                </div>
                <div className="inputs">
                    <input
                        type="text"
                        id="secondname"
                        placeholder="secondname"
                        value={info.secondname}
                        onChange={changeInfo}
                    />
                    <label htmlFor="secondname">Фамилия</label>
                </div>
                <div className="inputs">
                    <input
                        type="text"
                        id="phone"
                        placeholder="phone"
                        value={info.phone}
                        onChange={changeInfo}
                    />
                    <label htmlFor="phone">Телефон</label>
                </div>
                <div className="inputs">
                    <input
                        type="text"
                        id="address"
                        placeholder="address"
                        value={info.address}
                        onChange={changeInfo}
                    />
                    <label htmlFor="address">Адрес</label>
                </div>
                <div className="inputs-radio">
                    <h2>Метод Доставки</h2>
                    <div className="radio">
                        <label htmlFor="courier">Курьер</label>
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
                        <label htmlFor="np">Нова Почта</label>
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
                        <label htmlFor="own">Самовывоз</label>
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
                    <h2>Метод Оплаты</h2>
                    <div className="radio">
                        <label htmlFor="card">Карта</label>
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
                        <label htmlFor="ondelivery">При получении</label>
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
                <button onClick={createOrder}>Подтвердить заказ</button>
            </div>
        </div>
    );

    function createOrder() {
        // if (!checkInfo()) return;

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
                    console.log(res.data);
                    if (res.data.status) {
                        toast.success("Ваш заказ принят в обработку! Спасибо");
                        toast.success("Ваш номер заказа: " + res.data.id, {
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
                        toast.warning("Что то пошло не так");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Что то пошло не так");
                });
        } else {
            toast.warning("Оплата картой не доступна");
        }
    }

    function checkInfo() {
        if (info.name.length < 3) {
            toast.warning("Имя не указанно");
            return false;
        }
        if (info.secondname.length < 3) {
            toast.warning("Фамилия не указанна");
            return false;
        }
        if (info.phone.length < 9) {
            toast.warning("Телефон не указанно");
            return false;
        }
        if (delivery !== "np" && info.address.length < 5) {
            toast.warning("Адресс не указан");
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
