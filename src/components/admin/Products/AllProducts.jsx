import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserAxiosRequest } from "../../../requestMethods";
import ProductsHead from "./ProductsHead";

export default function AllProducts({ allFilters, events }) {
    const [products, setProducts] = useState(null);
    const protectedRequest = createUserAxiosRequest();

    useEffect(() => {
        protectedRequest
            .get("/products/all")
            .then((res) => {
                if (res.data.status) {
                    setProducts(res.data.products);
                } else {
                    setProducts([]);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Не смогли загрузить товар, проблема на сервере!");
            });
    }, []);

    if (!products) {
        return (
            <div className="admin loading-page">
                <div className="center">
                    <h1>Загружаем...</h1>
                </div>
            </div>
        );
    }
    return (
        <div className="admin">
            <div className="center">
                <ProductsHead allFilters={allFilters} events={events} />
                <div className="product-list">
                    <div className="item">
                        <div className="section">Фото</div>
                        <div className="section">Название</div>
                        <div className="section">Бренд</div>
                        <div className="section">Кол-во Вариантов</div>
                        <div className="section">Добавлен</div>
                    </div>
                    {remdereProductsList(products)}
                </div>
            </div>
        </div>
    );

    function remdereProductsList(products) {
        return products.map((item, index) => {
            return <ProductItem product={item} key={index} />;
        });
    }
}

function ProductItem({ product }) {
    const [activeImg, setActiveImg] = useState(product.imgs[0]);
    // const [loop, setLoop] = useState(false);
    const navigate = useNavigate();
    // let loop = false;
    // console.log(product);
    return (
        <div
            className="item"
            onMouseOver={() => {
                // setLoop(hoverEffect(true));
            }}
            onMouseLeave={() => {
                // setLoop(false);
                // setActiveImg(product.imgs[0]);
            }}
            onClick={() => {
                navigate("./" + product._id);
            }}
        >
            <div className="section">
                <img src={activeImg} alt="" />
            </div>
            <div className="section">{product.title}</div>
            <div className="section">{product.brand}</div>
            <div className="section">{product.variants.length}</div>
            <div className="section">{product.createdAt}</div>
        </div>
    );

    function hoverEffect(loop) {
        if (product.imgs.length > 1) {
            // console.log(loop);

            // loop = true;
            // console.log(loop);

            let position = 0;

            async function goLoop() {
                if (position + 1 === product.imgs.length) {
                    // console.log(product.imgs);
                    console.log("pos problem: " + product.imgs.length);
                    position = -1;
                }
                console.log("Pos: " + position);
                setActiveImg(product.imgs[position + 1]);
                position = position + 1;
                if (loop) {
                    console.log("check loop: " + loop);
                    await sleep(2500);
                    goLoop();
                }
            }

            goLoop();
        }
    }

    function sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
}
