import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../svg/logo.svg";
import { ReactComponent as Cart } from "../svg/cart.svg";
import { ReactComponent as Arrow } from "../svg/arrow.svg";
import useTranslate from "../../hook/useTranslate";
import ContactsInfo from "../../helpers/ContactInfo";
import { ReactComponent as Cancel } from "../svg/cancel.svg";
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";

function Header(props) {
    const navigate = useNavigate();
    const { language, changeLanguage, getTranslateBlock } = useTranslate();
    const [shopSubMenu, setShopSubMenu] = useState([]);

    const translate = getTranslateBlock("header");
    // console.log(language);
    // const { publicRequest }
    // publicRequest

    useEffect(() => {
        publicRequest
            .get("/filters/?type=type")
            .then(({ data }) => {
                setShopSubMenu(data.type);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="header forContainer">
            <div className="container big-container">
                <div className="top">
                    <div className="logo-block">
                        <Logo
                            className="logo"
                            onClick={() => {
                                navigate("/");
                            }}
                        />
                    </div>
                    <div className="functions">
                        <div className="language">
                            <span
                                className={language === "ua" ? `active` : ""}
                                data-name="ua"
                                onClick={({ target }) => {
                                    changeLang(target);
                                }}
                            >
                                UA
                            </span>
                            <span
                                className={language === "ru" ? `active` : ""}
                                data-name="ru"
                                onClick={({ target }) => {
                                    changeLang(target);
                                }}
                            >
                                RU
                            </span>
                        </div>
                        <Cart
                            className="header-cart"
                            onClick={() => {
                                navigate("/cart");
                            }}
                        />
                    </div>
                </div>
                <div className="bottom">
                    <ul className="menu">
                        <li
                            className="subMenu"
                            onClick={() => {
                                navigate("/shop");
                            }}
                        >
                            <span>
                                {translate.menu.shop}{" "}
                                <Arrow className="arrow-down" />
                            </span>
                            <ul
                                className="sub"
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                {/* <li onClick={()=>{navigate('/shop/bags')}}>{translate.menu.bag}</li>
                                <li onClick={()=>{navigate('/shop/backpacks')}}>{translate.menu.backpack}</li>
                                <li onClick={()=>{navigate('/shop/wallets')}}>{translate.menu.wallets}</li> */}
                                {renderSubMenu(shopSubMenu)}
                            </ul>
                        </li>
                        {/* <li onClick={()=>{navigate('/brands')}}>{translate.menu.brand}</li> */}
                        <li
                            onClick={() => {
                                navigate("/about");
                            }}
                        >
                            {translate.menu.about}
                        </li>
                        <li
                            onClick={() => {
                                navigate("/contacts");
                            }}
                        >
                            {translate.menu.contacts}
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container small-container">
                <div className="hader-head">
                    <div
                        className="menu"
                        onClick={() => {
                            document
                                .getElementsByClassName("small-menu")[0]
                                .classList.toggle("small-menu-active");
                        }}
                    >
                        <div className="line" />
                    </div>
                    <div className="small-logo-block">
                        <Logo
                            className="logo"
                            onClick={() => {
                                navigate("/");
                            }}
                        />
                    </div>
                    <Cart
                        className="header-cart-small"
                        onClick={() => {
                            navigate("/cart");
                        }}
                    />
                </div>
                <div className="small-menu">
                    <Cancel
                        className="cancel"
                        onClick={() => {
                            document
                                .getElementsByClassName("small-menu")[0]
                                .classList.toggle("small-menu-active");
                        }}
                    />
                    <ul className="small-menu-container">
                        <li
                            onClick={() => {
                                navigate("/shop");
                                document
                                    .getElementsByClassName("small-menu")[0]
                                    .classList.toggle("small-menu-active");
                            }}
                        >
                            {" "}
                            {translate.menu.shop}{" "}
                        </li>
                        <li
                            onClick={() => {
                                navigate("/shop/bags");
                                document
                                    .getElementsByClassName("small-menu")[0]
                                    .classList.toggle("small-menu-active");
                            }}
                        >
                            {translate.menu.bag}
                        </li>
                        <li
                            onClick={() => {
                                navigate("/shop/backpacks");
                                document
                                    .getElementsByClassName("small-menu")[0]
                                    .classList.toggle("small-menu-active");
                            }}
                        >
                            {translate.menu.backpack}
                        </li>
                        <li
                            onClick={() => {
                                navigate("/shop/wallets");
                                document
                                    .getElementsByClassName("small-menu")[0]
                                    .classList.toggle("small-menu-active");
                            }}
                        >
                            {translate.menu.wallets}
                        </li>
                        <li
                            onClick={() => {
                                navigate("/about");
                                document
                                    .getElementsByClassName("small-menu")[0]
                                    .classList.toggle("small-menu-active");
                            }}
                        >
                            {translate.menu.about}
                        </li>
                    </ul>
                    <div className="small-info">
                        <div className="top">
                            <a href={ContactsInfo.phone}>
                                {ContactsInfo.prettyPhone}
                            </a>
                            <a href={ContactsInfo.phone2}>
                                {ContactsInfo.prettyPhone2}
                            </a>
                        </div>
                        <div className="bottom">
                            <ul>
                                <li>{translate.work.head}</li>
                                <li>{translate.work.time}</li>
                                <li>{translate.work.holiday}</li>
                            </ul>
                            <div className="language">
                                <span
                                    className={
                                        language === "ua" ? `active` : ""
                                    }
                                    data-name="ua"
                                    onClick={({ target }) => {
                                        changeLang(target);
                                        document
                                            .getElementsByClassName(
                                                "small-menu"
                                            )[0]
                                            .classList.toggle(
                                                "small-menu-active"
                                            );
                                    }}
                                >
                                    UA
                                </span>
                                <span
                                    className={
                                        language === "ru" ? `active` : ""
                                    }
                                    data-name="ru"
                                    onClick={({ target }) => {
                                        changeLang(target);
                                        document
                                            .getElementsByClassName(
                                                "small-menu"
                                            )[0]
                                            .classList.toggle(
                                                "small-menu-active"
                                            );
                                    }}
                                >
                                    RU
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function renderSubMenu(menu) {
        return menu.map((item, index) => {
            // console.log(item);
            return (
                <li
                    key={index}
                    onClick={() => {
                        navigate("/shop/" + item._id);
                    }}
                >
                    {item.name[language]}
                </li>
            );
        });
    }

    function changeLang(target) {
        const lang = target.dataset.name;
        console.log(lang);
        changeLanguage(lang);
    }
}

export default Header;
