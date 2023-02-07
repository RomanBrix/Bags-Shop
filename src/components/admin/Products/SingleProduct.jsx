import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TwitterPicker } from "react-color";
import { toast } from "react-toastify";
import { createUserAxiosRequest } from "../../../requestMethods";
import { ReactComponent as UploadImgSvg } from "./svg/uploadImg.svg";
import { ReactComponent as PlusSvg } from "./svg/plus.svg";

export default function SingleProduct({ allFilters }) {
    const { id } = useParams();
    const [fetchData, setFetchData] = useState(false);
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
        material: {
            ua: "",
            ru: "",
        },
    });
    const [filesToUpload, setFilesToUpload] = useState([]);

    const protectedRequest = createUserAxiosRequest();

    const brandListRef = useRef(null);
    const typeListRef = useRef(null);

    const navigate = useNavigate("");
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
            protectedRequest
                .get("/products/one/" + id)
                .then(({ data }) => {
                    // console.log(res);
                    if (data.status) {
                        if (data.product?.material) {
                            setProduct(data.product);
                        } else {
                            setProduct({
                                ...data.product,
                                material: {
                                    ua: "",
                                    ru: "",
                                },
                            });
                        }
                        setLoading(false);
                    } else {
                        navigate("../");
                    }
                })
                .catch((err) => {
                    // console.log(err);
                    navigate("../");
                });
        }

        if (id === "new") {
            setLoading(false);
        }
    }, []);
    // const
    // console.log(product);
    // console.log(filesToUpload);
    if (loading)
        return (
            <div className="admin loading-page">
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
                <div className="block ">
                    <h2>1. Загрузите фотографии</h2>
                    <div
                        className="hide-input"
                        onClick={() => {
                            document.getElementById("imgInp").click();
                        }}
                    >
                        <UploadImgSvg />
                    </div>
                    <input
                        accept="image/*"
                        type="file"
                        id="imgInp"
                        onChange={({ target }) => {
                            const [file] = target.files;
                            if (!file) return;
                            console.log(file);
                            // if (filesToUpload.includes(file)) console.log("DA");

                            let double = false;
                            filesToUpload.forEach((item) => {
                                if (item.name === file.name) {
                                    double = true;
                                }
                            });

                            if (double) {
                                toast.warning("Файл с таким именем уже есть");
                                return;
                            }
                            setFilesToUpload((prev) => [...prev, file]);
                            //prev = URL.createObjectURL(file)
                        }}
                    />
                    <div className="imgs-list inline-content">
                        <ImagePrewiew
                            imglist={filesToUpload}
                            func={deleteProductImg}
                            type="upload"
                        />
                        <ImagePrewiew
                            imglist={product.imgs}
                            func={deleteProductImg}
                        />
                    </div>
                </div>
                <div className="block">
                    <h2>2. Заполните основную информацию</h2>
                    <div className="inputs">
                        <input
                            type="text"
                            id="title"
                            value={product.title}
                            onChange={changeVal}
                            placeholder={" "}
                        />
                        <label htmlFor="title">Название</label>
                    </div>
                    <div className="inputs">
                        <input
                            type="text"
                            id="about_ua"
                            value={product.about.ua}
                            onChange={changeAboutVal}
                            placeholder={" "}
                        />
                        <label htmlFor="about_ua">Описание (UA)</label>
                    </div>
                    <div className="inputs">
                        <input
                            type="text"
                            id="about_ru"
                            value={product.about.ru}
                            onChange={changeAboutVal}
                            placeholder={" "}
                        />
                        <label htmlFor="about_ru">Описание (ru)</label>
                    </div>

                    <div className="inputs">
                        <input
                            type="text"
                            id="params"
                            value={product.params}
                            onChange={changeVal}
                            placeholder={" "}
                        />
                        <label htmlFor="params">Размер</label>
                    </div>

                    <div className="inputs">
                        <input
                            type="text"
                            id="material_ua"
                            value={product.material?.ua}
                            onChange={changeAboutVal}
                            placeholder={" "}
                        />
                        <label htmlFor="material_ua">Материал UA</label>
                    </div>
                    <div className="inputs">
                        <input
                            type="text"
                            id="material_ru"
                            value={product.material?.ru}
                            onChange={changeAboutVal}
                            placeholder={" "}
                        />
                        <label htmlFor="material_ru">Материал RU</label>
                    </div>

                    <div className="inputs-select">
                        <div className="label">Бренд:</div>
                        <div className="select close" ref={brandListRef}>
                            <div
                                className="head"
                                onClick={() => {
                                    brandListRef.current.classList.toggle(
                                        "close"
                                    );
                                }}
                            >
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
                            <div
                                className="head"
                                onClick={() => {
                                    typeListRef.current.classList.toggle(
                                        "close"
                                    );
                                }}
                            >
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
                        <PlusSvg />
                    </button>
                    <div className="variant-list inline-content">
                        {renderVariants(product.variants)}
                    </div>
                </div>

                <div className="btns">
                    {id !== "new" && (
                        <button className="delete" onClick={deleteProduct}>
                            Удалить
                        </button>
                    )}
                    <button className="save" onClick={save}>
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );

    function deleteProduct() {
        if (!window.confirm("Удалить?")) return;
        // console.log();
        protectedRequest
            .delete("/products/" + id)
            .then(({ data }) => {
                // console.log(first)
                if (data.status) {
                    toast.success("Продукт удален");
                    navigate("../");
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Ошибка! Обновите страницу или попробуйте позже");
            });
    }

    function save(e) {
        if (product.imgs.length < 1 && filesToUpload.length < 1) {
            toast.warning("Добавьте хотя бы одно фото");
            return;
        }

        if (product.variants.length < 1) {
            toast.warning("Добавьте хотя бы один вариант");
            return;
        }
        if (fetchData) {
            toast.warning("Данные загружаются подождите!");
            return;
        }
        //send data to server
        // console.log(e.preventDefault);
        // console.log(filesToUpload);
        setFetchData(true);
        let bodyFormData = new FormData();
        if (filesToUpload.length > 0) {
            filesToUpload.forEach((file) => {
                bodyFormData.append(file.name, file);
            });
        }

        // const productToSave = {
        //     ...product,
        //     variants: product.variants.map((variant) => {
        //         const { discount_on, discount, price,...other } = variant;
        //         if (variant.discount_on) {
        //             return {
        //                 ...other,
        //                 discount: price,
        //                 price: discount
        //             };
        //         } else {
        //             return variant;
        //         }
        //     }),
        // };

        bodyFormData.append("product", JSON.stringify(product));
        e.preventDefault();
        protectedRequest
            .post("/products/", bodyFormData)
            .then((res) => {
                // e.preventDefault();
                console.log(res);
                if (res.data.status) {
                    toast.success("Изминения сохранены!");
                    setFetchData(false);

                    // setFilesToUpload([]);
                    // setProduct({
                    //     title: "",
                    //     brand: null,
                    //     type: {
                    //         ua: null,
                    //         ru: null,
                    //     },
                    //     about: {
                    //         ua: "",
                    //         ru: "",
                    //     },
                    //     imgs: [],
                    //     variants: [],
                    //     params: "Стандарт",
                    // });
                    if (res.data?.id) {
                        navigate("../" + res.data.id);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Произошла ошибка, обновите страницу и повторите");
                setFetchData(false);
            });
        // products
    }

    function deleteProductImg(index, type) {
        if (type) {
            setFilesToUpload((prev) => {
                return prev.filter((item, indx) => indx !== index);
            });
        } else {
            setProduct((prev) => {
                return {
                    ...prev,
                    imgs: prev.imgs.filter((item, indx) => indx !== index),
                };
            });
        }
    }

    /*//////////////
                                    VARIANTS LOGIC
    //////////////*/

    function renderVariants(list) {
        // return React Color
        return list
            .map((item, index) => {
                return (
                    <VariantsListItem
                        product={product}
                        filesToUpload={filesToUpload}
                        selectVariantImg={selectVariantImg}
                        item={item}
                        index={index}
                        key={index}
                        changeVariant={changeVariant}
                        deleteVariant={deleteVariant}
                    />
                );
            })
            .reverse();
    }

    function selectVariantImg(photoIndex, type = null, variantIndex) {
        // console.log(type);
        let selectedIndex = null;
        if (type === "upload") {
            selectedIndex = product.imgs.length + +photoIndex;
        } else {
            selectedIndex = photoIndex;
        }
        setProduct((prev) => {
            const newVar = prev;
            newVar.variants[variantIndex].imgIndex = selectedIndex;
            return newVar;
        });
    }

    function deleteVariant(index) {
        setProduct((prev) => {
            let newProd = { ...prev };
            newProd.variants = newProd.variants.filter(
                (item, indx) => index != indx
            );
            return newProd;
        });
    }

    function changeVariant(variant, index) {
        setProduct((prev) => {
            let newProd = { ...prev };
            newProd.variants[index] = variant;
            return newProd;
        });
    }
    function addVariant() {
        setProduct((prev) => ({
            ...prev,
            variants: [
                ...prev.variants,
                {
                    color: "#00D084",
                    price: 1,
                    discount_on: false,
                    discount: 1,
                    imgIndex: null,
                },
            ],
        }));
    }

    /*//////////////
                                    MAIN INFO LOGIC 
    //////////////*/

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
        // console.log(ref);
        ref.current.classList.add("close");
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

/*//////////////
                                    VARIANTS LIST ITEM COMPONENT
//////////////*/
function VariantsListItem({
    item,
    index,
    changeVariant,
    deleteVariant,
    filesToUpload,
    selectVariantImg,
    product,
}) {
    const [showPicker, setShowPicker] = useState(false);
    const [selectVatiantPhotoShow, setSelectVatiantPhotoShow] = useState(false);

    // console.log(item);
    return (
        <div className="item" key={index}>
            <div className="color">
                <div className="head">Цвет варианта:</div>
                <div
                    className="color-name"
                    onClick={() => {
                        setShowPicker((prev) => !prev);
                    }}
                    style={{ backgroundColor: item.color }}
                />
                {showPicker && (
                    <TwitterPicker
                        color={item.color}
                        triangle={"hide"}
                        colors={[
                            "#FF6900",
                            "#FCB900",
                            "#7BDCB5",
                            "#00D084",
                            "#8ED1FC",
                            "#0693E3",
                            "#ABB8C3",
                            "#EB144C",
                            "#F78DA7",
                            "#9900EF",
                            "#333",

                            "#b59b7c",
                            "#FFFF66",
                            "#45322E",
                            "#ffa500",
                            "#000",
                            "#8039c3",
                            "#fff",
                            "#f80000",
                            "#00008b",
                            "#ff1493",
                            "#808080",
                            "#c0c0c0",
                            "#b8860B",
                            "#e9e3ce",
                            "#013220",
                            "#c154c1",
                            "#fefe",
                        ]}
                        onChangeComplete={(color) => {
                            changeVariant({ ...item, color: color.hex }, index);
                            setShowPicker(false);
                        }}
                    />
                )}
            </div>
            <div className="checkbox">
                <label htmlFor={`discount_on_${index}`}>Включить скидку</label>
                <input
                    type="checkbox"
                    name="discount"
                    id={`discount_on_${index}`}
                    value={item.discount_on}
                    checked={item.discount_on}
                    onChange={({ target }) => {
                        changeVariant(
                            { ...item, discount_on: target.checked },
                            index
                        );
                    }}
                />
            </div>
            <div className="price inputs">
                <input
                    type="number"
                    id={`price_${index}`}
                    value={item.price}
                    onChange={({ target }) => {
                        changeVariant({ ...item, price: target.value }, index);
                    }}
                />
                <label htmlFor={`price_${index}`}>
                    {item.discount_on ? "Цена со скидкой" : "Цена"}
                </label>
            </div>

            {item.discount_on && (
                <div className="discount inputs">
                    <input
                        type="number"
                        id={`discount_${index}`}
                        value={item.discount}
                        onChange={({ target }) => {
                            changeVariant(
                                { ...item, discount: +target.value },
                                index
                            );
                        }}
                    />
                    <label htmlFor={`discount_${index}`}>Цена без скидки</label>
                </div>
            )}

            <div className="selectphoto">
                <p>
                    {item.imgIndex !== null &&
                    (product.imgs.length > 0 || filesToUpload.length > 0) ? (
                        <img
                            src={
                                item.imgIndex >= product.imgs.length
                                    ? URL.createObjectURL(
                                          filesToUpload[item.imgIndex]
                                      )
                                    : product.imgs[item.imgIndex]
                            }
                            className="preview"
                        />
                    ) : (
                        "Выбрать фото для варианта из загруженных (если не выбирать будет заглавная)"
                    )}
                </p>
                <button
                    onClick={() => {
                        setSelectVatiantPhotoShow(true);
                    }}
                    className="select-btn"
                >
                    Выбрать Фото
                </button>
                {selectVatiantPhotoShow && (
                    <div className="imgs-list">
                        <ImagePrewiew
                            imglist={filesToUpload}
                            type="upload"
                            func={(photo, type) => {
                                selectVariantImg(photo, type, index);
                                setSelectVatiantPhotoShow(false);
                            }}
                        />
                        <ImagePrewiew
                            imglist={product.imgs}
                            func={(photo, type) => {
                                selectVariantImg(photo, type, index);
                                setSelectVatiantPhotoShow(false);
                            }}
                        />
                    </div>
                )}
            </div>
            <button
                className="delete"
                onClick={() => {
                    deleteVariant(index);
                }}
            >
                Удалить Вариант
            </button>
        </div>
    );
}

function ImagePrewiew({ imglist, func, type = null }) {
    if (imglist.length === 0) return "";
    return imglist.map((item, index) => {
        return (
            <div
                className="placehold"
                onClick={() => {
                    func(index, type);
                }}
                key={index}
            >
                <img
                    src={type === "upload" ? URL.createObjectURL(item) : item}
                />
            </div>
        );
    });
}
