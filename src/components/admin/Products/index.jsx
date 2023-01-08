import { useEffect } from "react";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserAxiosRequest } from "../../../requestMethods";
import AllProducts from "./AllProducts";
import SingleProduct from "./SingleProduct";

export default function Products() {
    const [allFilters, setAllFilters] = useState({
        type: null,
        brand: null,
    });
    const protectedRequest = createUserAxiosRequest();

    useEffect(() => {
        loadTypeFilters();
        loadBrandFilters();
    }, []);

    const events = {
        brand: loadBrandFilters,
        type: loadTypeFilters,
    };
    return (
        <Routes>
            <Route
                index
                element={
                    <AllProducts allFilters={allFilters} events={events} />
                }
            />
            <Route path=":id" element={<SingleProduct allFilters={allFilters}/>} />
        </Routes>
    );

    async function loadTypeFilters() {
        try {
            const { data } = await protectedRequest.get("/filters/?type=type");
            // console.log(data);
            setAllFilters((prev) => ({ ...prev, type: data.type }));
        } catch (err) {
            toast.error("Ошибка загрузки фильтра:тип");
        }
    }
    async function loadBrandFilters() {
        try {
            const { data } = await protectedRequest.get("/filters/?type=brand");
            setAllFilters((prev) => ({ ...prev, brand: data.brand }));
        } catch (err) {
            toast.error("Ошибка загрузки фильтра:бренд");
        }
    }
}
