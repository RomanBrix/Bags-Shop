import { lazy, Suspense, useEffect, useState } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProduct from "../../hook/useProduct";
import { ReactComponent as Loader } from "../svg/hearts.svg";
import Cookies from "js-cookie";
import useTranslate from "../../hook/useTranslate";
import { publicRequest } from "../../requestMethods";
import { toast } from "react-toastify";

function SingleProduct(props) {
    const id = useParams()["id"] || "all";
    const navigate = useNavigate();
    // const { getSingleProduct } = useProduct();

    const [product, setProduct] = useState(null);
    const [activeImg, setActiveImg] = useState(null);

    const [activeVariant, setActiveVariant] = useState(null);
    const [activePrice, setActivePrice] = useState(null);
    // console.log(product);
    // console.log(product);

    const MainImg = getLazyImage({ src: activeImg, alt: "" });

    useEffect(() => {
        publicRequest
            .get("/products/one/" + id)
            .then(({ data }) => {
                setProduct(data.product);
                setActiveImg(data.product.imgs[0]);
            })
            .catch((err) => {
                console.log(err);
                navigate(-1);
            });
    }, []);
    useEffect(() => {
        if (product) {
            if (activeVariant) {
                const price = activeVariant.discount_on ? (
                    <span className="discount">
                        <span className="sale">
                            {activeVariant.discount} UAH
                        </span>
                        <span className="dis-price">
                            {activeVariant.price} UAH
                        </span>
                    </span>
                ) : (
                    activeVariant.price
                );
                setActivePrice(price);
            } else {
                const priceArr = product.variants
                    .map((item) => {
                        return item.price;
                    })
                    .sort((a, b) => a - b);
                let price =
                    priceArr.length > 1
                        ? `${priceArr[0]} - ${priceArr[priceArr.length - 1]}`
                        : priceArr[0];

                setActivePrice(price);
            }
        }
    }, [activeVariant, product]);

    const { language } = useTranslate();
    // console.log(product);
    if (!product) {
        return (
            <div className="single-product forContainer">
                <div className="container">
                    <h1>Loading...</h1>
                </div>
            </div>
        );
    }
    return (
        <div className="single-product forContainer">
            <div className="container">
                <div className="main-img">
                    <Suspense
                        fallback={
                            <div className="loading">
                                <Loader />
                            </div>
                        }
                    >
                        <MainImg />
                    </Suspense>
                </div>
                <div className="info">
                    <h2>{product.title}</h2>

                    <div className="about">{product.about[language]}</div>
                    <div className="info-item">
                        <div className="headline">
                            {language === "ua" ? "Вид товару" : "Вид товара"}
                        </div>
                        <div className="content">{product.type[language]}</div>
                    </div>
                    <div className="info-item">
                        <div className="headline">Бренд</div>
                        <div className="content">{product.brand}</div>
                    </div>
                    <div className="info-item">
                        <div className="headline">
                            {language === "ua" ? "Параметри" : "Параметры"}
                        </div>
                        <div className="content">{product.params}</div>
                    </div>

                    {product?.material && (
                        <div className="info-item">
                            <div className="headline">
                                {language === "ua" ? "Матерiал" : "Материал"}
                            </div>
                            <div className="content">
                                {product.material[language]}
                            </div>
                        </div>
                    )}

                    <p className="var-head">
                        {product.variants.length > 1
                            ? language === "ua"
                                ? "Варіанти:"
                                : "Варианты:"
                            : language === "ua"
                            ? "Варіант:"
                            : "Вариант:"}
                    </p>
                    <div className="variants">
                        {renderVariants(product.variants)}
                    </div>

                    <div className="bottom">
                        <div className="price">
                            {activePrice}{" "}
                            <span className="active-price">UAH.</span>
                        </div>
                        <div
                            className="btn-buy"
                            onClick={() => {
                                addtoCart();
                            }}
                        >
                            {language === "ua"
                                ? "Додати до кошика"
                                : "Добавить в корзину"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function addtoCart() {
        // const activeVarian = document.getElementsByClassName("active-variant");

        if (!activeVariant) {
            language === "ua"
                ? toast.warning("Потрібно вибрати варіант продукту")
                : toast.warning("Нужно выбрать вариант продукта");
            return;
        }

        language === "ua"
            ? toast.success("Товар додано!")
            : toast.success("Продукт добавлен!");

        const cookieBuy = Cookies.get("buy");
        const toBuy = cookieBuy ? JSON.parse(cookieBuy) : {};
        // console.log(product);
        if (toBuy[product._id]) {
            if (toBuy[product._id].variants[activeVariant._id]) {
                toBuy[product._id].variants[activeVariant._id].quanity += 1;
            } else {
                toBuy[product._id].variants[activeVariant._id] = {
                    ...activeVariant,
                    quanity: 1,
                };
            }
        } else {
            toBuy[product._id] = {
                title: product.title,
                brand: product.brand,
                imgs: product.imgs,
                variants: {
                    [activeVariant._id]: {
                        ...activeVariant,
                        quanity: 1,
                    },
                },
            };
        }
        // console.log(toBuy);
        Cookies.set("buy", JSON.stringify(toBuy));

        /*
        const cookieBuy = Cookies.get("buy");
        const toBuy = cookieBuy ? JSON.parse(cookieBuy) : [];

        let itemIndex = null;
        toBuy.filter((item, index) => {
            // eslint-disable-next-line
            if (item.id == id && item.typeName == varinatName) {
                itemIndex = index;
                return true;
            }
            return false;
        });

        if (itemIndex !== null) {
            toBuy[itemIndex] = {
                ...toBuy[itemIndex],
                count: toBuy[itemIndex].count + 1,
            };
        } else {
            toBuy.push({
                id,
                typeName: varinatName,
                img: activeImg,
                price: product.price,
                count: 1,
            });
        }

        Cookies.set("buy", JSON.stringify(toBuy));
        */
    }

    function selectVariant(target, variant) {
        const prevVar = document.getElementsByClassName("active-variant")[0];
        if (prevVar) prevVar.classList.remove("active-variant");
        target.classList.add("active-variant");
        if (variant.imgIndex !== null) {
            setActiveImg(product.imgs[variant.imgIndex]);
        } else {
            setActiveImg(product.imgs[0]);
        }
        setActiveVariant(variant);
    }
    function renderVariants(variants) {
        return variants.map((item, index) => {
            const style =
                item.imgIndex !== null
                    ? {
                          backgroundImage: `url("${
                              product.imgs[item.imgIndex]
                          }")`,
                      }
                    : { background: `${item.color}` };

            // const price = item.discount_on ? item.discount : item.price;
            // console.log(style);
            return (
                <div
                    className="variant"
                    key={index}
                    onClick={({ target }) => {
                        if (!target.classList.contains("variant")) {
                            target.parentElement.click();
                            return;
                        }
                        selectVariant(target, item);
                    }}
                    style={style}
                >
                    <div
                        className="holder"
                        style={{ background: `${item.color}` }}
                    />
                    <div
                        className="mini-price"
                        style={{ color: `${invertColor(item.color, true)}` }}
                    >
                        {item.price}₴
                    </div>
                </div>
            );
        });
    }
}

const getImageComponent =
    ({ src, alt, dataSrc, dataVariant }) =>
    () =>
        (
            <img
                className="variant-img"
                src={src}
                alt={alt}
                data-src={dataSrc}
                data-variant={dataVariant}
            />
        );

const getLazyImage = ({ src, alt = "", dataSrc = "", dataVariant = "" }) =>
    lazy(
        () =>
            new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => {
                    resolve({
                        default: getImageComponent({
                            src,
                            alt,
                            dataVariant,
                            dataSrc,
                        }),
                    });
                };
                image.onerror = (err) => {
                    console.log(err);
                };
                image.src = src;
            })
    );

function invertColor(hex, bw) {
    if (hex.indexOf("#") === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error("Invalid HEX color.");
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // https://stackoverflow.com/a/3943023/112731
        return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}
function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join("0");
    return (zeros + str).slice(-len);
}
export default SingleProduct;
