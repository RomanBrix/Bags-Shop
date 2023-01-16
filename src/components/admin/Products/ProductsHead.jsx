import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserAxiosRequest } from "../../../requestMethods";
import FiltersLayout from "./FiltersLayout";

export default function ProductsHead({ allFilters, events }) {
    const [showFiltersLayout, setShowFiltersLayout] = useState(false);
    const [csv, setCsv] = useState(null);
    const [photos, setPhotos] = useState(null);

    const [bigLoad, setBigLoad] = useState(false);
    const navigate = useNavigate();
    const protectedRequest = createUserAxiosRequest();

    useEffect(() => {
        uploadProducts();
    }, [csv]);

    useEffect(() => {
        console.log("go");
        uploadPhotos();
    }, [photos]);
    // const [filterLayoutType, setFilterLayoutType]
    console.log(csv);
    return (
        <div className="products-head">
            {bigLoad && <div className="load">LOADDDDD</div>}
            <div className="center">
                {showFiltersLayout && (
                    <FiltersLayout
                        setShowFiltersLayout={setShowFiltersLayout}
                        filters={allFilters[showFiltersLayout]}
                        loadEvent={events[showFiltersLayout]}
                        type={showFiltersLayout}
                    />
                )}
                <ul>
                    <li
                        onClick={() => {
                            navigate("./new");
                        }}
                    >
                        Добавить Товар
                    </li>
                    <li
                        onClick={() => {
                            document.getElementById("manyProducts").click();
                        }}
                    >
                        Загрузить Товар
                    </li>
                    <li
                        onClick={() => {
                            document.getElementById("manyPhotos").click();
                        }}
                    >
                        Загрузить Фотки
                    </li>
                    <li
                        onClick={() => {
                            setShowFiltersLayout("type");
                        }}
                    >
                        Фильтры:Тип
                    </li>
                    <li
                        onClick={() => {
                            setShowFiltersLayout("brand");
                        }}
                    >
                        Фильтры:Бренд
                    </li>
                </ul>
                <input
                    type="file"
                    accept=".csv"
                    name="products"
                    // value={csv}
                    id="manyProducts"
                    style={{ visibility: "hidden" }}
                    onChange={({ target }) => {
                        const [file] = target.files;
                        if (!file) return;
                        console.log(file);
                        setCsv(file);
                    }}
                />
                <input
                    type="file"
                    accept=".zip"
                    name="photos"
                    // value={csv}
                    id="manyPhotos"
                    style={{ visibility: "hidden" }}
                    onChange={({ target }) => {
                        const [file] = target.files;
                        if (!file) return;
                        console.log(file);
                        setPhotos(file);
                    }}
                />
            </div>
        </div>
    );

    function uploadPhotos() {
        if (photos) {
            let bodyFormData = new FormData();
            bodyFormData.append("photos", photos);
            setBigLoad(true);
            // console.log(bodyFormData);
            protectedRequest
                .post("/products/manyphotos", bodyFormData)
                .then((res) => {
                    console.log(res);
                    if (res.data.status) {
                        toast.success("True");
                        window.location.reload();
                    } else {
                        toast.warning("???");
                    }

                    setBigLoad(false);
                    setPhotos(null);
                })
                .catch((err) => {
                    console.log(err);

                    toast.error("???");
                    setBigLoad(false);
                    setPhotos(null);
                });
        } else {
            document.getElementById("manyPhotos").value = "";
        }
    }

    function uploadProducts() {
        if (csv) {
            let bodyFormData = new FormData();
            bodyFormData.append("csv", csv);
            setBigLoad(true);
            protectedRequest
                .post("/products/manyproducts", bodyFormData)
                .then((res) => {
                    console.log(res);
                    if (res.data.status) {
                        toast.success("True");
                        window.location.reload();
                    } else {
                        toast.warning("???");
                    }

                    setBigLoad(false);
                    setCsv(null);
                })
                .catch((err) => {
                    console.log(err);

                    toast.error("Only .zip files pls");
                    setBigLoad(false);
                    setCsv(null);
                });
        } else {
            document.getElementById("manyProducts").value = "";
        }
    }
}
