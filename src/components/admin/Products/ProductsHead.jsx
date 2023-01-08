import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FiltersLayout from "./FiltersLayout";

export default function ProductsHead({ allFilters, events }) {
    const [showFiltersLayout, setShowFiltersLayout] = useState(false);
    const navigate = useNavigate();
    // const [filterLayoutType, setFilterLayoutType]
    return (
        <div className="products-head">
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
                    <li>Загрузить Товар</li>
                    <li>Загрузить Фотки</li>
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
            </div>
        </div>
    );
}
