import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../hook/useTranslate";
import { ReactComponent as Cancel } from "../svg/cancel.svg";

function Cart(props) {
    const cookieBuy = Cookies.get("buy");
    const navigate = useNavigate();
    useEffect(() => {
        // console.log(cookieBuy);
        if (!cookieBuy) {
            navigate("/shop");
        }
        // eslint-disable-next-line
    }, [cookieBuy]);

    const [toBuy, setToBuy] = useState(cookieBuy ? JSON.parse(cookieBuy) : {});
    // const [totalSumm, setTotalSumm] = useState(0);
    useEffect(() => {
        console.log("change");
        if (Object.keys(toBuy).length === 0) {
            navigate("/shop");
        }
        // eslint-disable-next-line
    }, [toBuy]);

    const { getTranslateBlock } = useTranslate();

    const translate = getTranslateBlock("cart");

    // console.log(toBuy);
    let totalSumm = 0;

    return (
        <div className="cart forContainer">
            <div className="container">
                <div className="items-container">{renderToBuy(toBuy)}</div>
                <div className="total-price">
                    <span>
                        {translate.total} : {totalSumm} UAH
                    </span>
                </div>
                <div className="btns">
                    <div
                        className="btn btn-reload"
                        onClick={() => {
                            navigate("/shop");
                        }}
                    >
                        {translate.btnMore}
                    </div>
                    <div
                        className="btn btn-buy"
                        onClick={() => {
                            buy();
                        }}
                    >
                        {translate.btnBuy}
                    </div>
                </div>
            </div>
        </div>
    );

    function buy() {
        // alert("OK");
        // toast.
        navigate("./user");
    }

    function deleteBuyElement(item, variant) {
        const newToBuy = { ...toBuy };
        delete newToBuy[item].variants[variant];
        if (Object.keys(newToBuy[item].variants).length === 0)
            delete newToBuy[item];
        // console.log(newToBuy);
        setToBuy(newToBuy);
        Cookies.set("buy", JSON.stringify(newToBuy));
        // const newToBuy = toBuy.filter((item, ind) => {
        //     return ind !== index;
        // });
        // //
        // setToBuy(newToBuy);
        // Cookies.set("buy", JSON.stringify(newToBuy));

        // console.log(toBuy);
        // console.log(newToBuy);
    }

    function renderToBuy(toBuy) {
        let mainArray = [];
        let total = 0;

        for (const key in toBuy) {
            const array = [];

            for (const variant in toBuy[key].variants) {
                const quantiy = toBuy[key].variants[variant].quanity;
                const price = toBuy[key].variants[variant].price;
                const imgIndex = toBuy[key].variants[variant].imgIndex;
                total += +quantiy * price;
                array.push(
                    <div className="buy-item" key={variant}>
                        <div className="left">
                            <div
                                className="img"
                                style={{
                                    backgroundImage: `url(${
                                        toBuy[key].imgs[imgIndex ? imgIndex : 0]
                                    })`,
                                }}
                            >
                                {/* <img src={item.img} alt={item.typeName} /> */}
                            </div>
                            <div className="name">{toBuy[key].title}</div>
                        </div>
                        <div className="right">
                            <div className="counter">{quantiy}</div>
                            <div className="price">{+quantiy * +price} UAH</div>
                            <div className="cancel">
                                <Cancel
                                    onClick={() => {
                                        deleteBuyElement(key, variant);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                );
            }

            mainArray = [...mainArray, ...array];
        }

        totalSumm = total;
        return mainArray;
    }
}

export default Cart;
