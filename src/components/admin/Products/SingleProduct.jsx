import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SingleProduct({ allFilters }) {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({
        title: "",
        brand: null,
        type: {
            ua: null,
            ru: null,
        },
        about: {
            ua: "",
            ru: "",
        },
        imgs: [],
        variants: [],
        params: "Стандарт",
    });
    const brandListRef = useRef(null);
    const typeListRef = useRef(null);

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
    // console.log(product);
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
                    <div className="inputs">
                        <label htmlFor="title">Название</label>
                        <input
                            type="text"
                            id="title"
                            value={product.title}
                            onChange={changeVal}
                        />
                    </div>
                    <div className="inputs">
                        <label htmlFor="about_ua">Описание (UA)</label>
                        <input
                            type="text"
                            id="about_ua"
                            value={product.about.ua}
                            onChange={changeAboutVal}
                        />
                    </div>
                    <div className="inputs">
                        <label htmlFor="about_ru">Описание (ru)</label>
                        <input
                            type="text"
                            id="about_ru"
                            value={product.about.ru}
                            onChange={changeAboutVal}
                        />
                    </div>

                    <div className="inputs">
                        <label htmlFor="params">Размер</label>
                        <input
                            type="text"
                            id="params"
                            value={product.params}
                            onChange={changeVal}
                        />
                    </div>

                    <div className="inputs-select">
                        <div className="label">Бренд:</div>
                        <div className="select close" ref={brandListRef}>
                            <div className="head">
                                {product.brand || "Выбрать бренд"}
                            </div>
                            <div className="select-list">
                                {renderSelectList(
                                    "brand",
                                    allFilters.brand,
                                    brandListRef
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="inputs-select">
                        <div className="label">Тип:</div>
                        <div className="select close" ref={typeListRef}>
                            <div className="head">
                                {product.type.ru || "Выбрать Тип"}
                            </div>
                            <div className="select-list">
                                {renderSelectList(
                                    "type",
                                    allFilters.type,
                                    typeListRef
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block">
                    <h2>3. Добавьте варианты товара</h2>

                    <button className="add" onClick={addVariant}>
                        Добавить вариант
                    </button>
                    <div className="variant-list">
                        {renderVariants(product.variants)}
                    </div>
                </div>
            </div>
        </div>
    );

    function renderVariants(list) {
        // return
    }

    function addVariant() {
        const newProd = product;
        newProd.variants.push({
            color: "#fefefe",
            price: 1,
            imgIndex: null,
        });
    }

    function changeAboutVal({ target }) {
        const [about, key] = target.id.split("_");
        setProduct((prev) => ({
            ...prev,
            [about]: { ...prev[about], [key]: target.value },
        }));
    }
    function changeVal({ target }) {
        setProduct((prev) => ({ ...prev, [target.id]: target.value }));
    }

    function selectFilter(type, value, ref) {
        //change class of ref
        console.log(ref);
        setProduct((prev) => ({ ...prev, [type]: value }));
    }

    function renderSelectList(type, list, ref) {
        if (!list) return <h3>Загружаем</h3>;
        if (list.length === 0)
            return <div className="item">Нету Элементов</div>;
        return list.map((item, index) => {
            const value = type === "brand" ? item.name : item.name.ru;
            return (
                <div
                    className="item"
                    key={index}
                    onClick={() => {
                        selectFilter(type, item.name, ref);
                    }}
                >
                    {value}
                </div>
            );
        });
    }
}
