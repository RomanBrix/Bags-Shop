import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SingleProduct() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({
        title: "",
        brand: "",
        type: {
            ua: "",
            ru: "",
        },
        about: {
            ua: "",
            ru: "",
        },
        imgs: [],
        variants: [],
        params: "20/14/7",
    });

    /*
        {
            color: '#fff',
            price: 1,
            imgIndex: null,
        }
    */

    useEffect(() => {
        if (id && id !== "new") {
            //load product
            //set load to false
        }

        if (id === "new") {
            setLoading(false);
        }
    }, []);
    // const
    // console.log(id);
    if (loading)
        return (
            <div className="admin">
                <div className="center">
                    <h1>Загружаем...</h1>
                </div>
            </div>
        );
    return (
        <div className="admin">
            <div className="center">
                <h1>
                    {id === "new" ? "Создаем новый товар" : "Редактируем товар"}
                </h1>
                <div className="block">
                    <h2>1. Загрузите фотографии</h2>
                    грузи ебать
                </div>
                <div className="block">
                    <h2>2. Заполните основную информацию</h2>
                    title, <br />
                    brand,
                    <br />
                    type,
                    <br />
                    about,
                    <br />
                    params
                    <br />
                </div>
                <div className="block">
                    <h2>3. Добавьте варианты товара</h2>
                    кнопка добавить
                    <br />
                    color: '#fff',
                    <br />
                    price: 1,
                    <br />
                    imgIndex: null,
                    <br />
                </div>
            </div>
        </div>
    );
}
