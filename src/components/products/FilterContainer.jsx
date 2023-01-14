import { Slider } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../../hook/useProduct";
import useTranslate from "../../hook/useTranslate";

import { ReactComponent as Cancel } from "../svg/cancel.svg";

function valuetext(value) {
    return `${value} UAH`;
}

function FilterContainer(props) {
    const urlType = useParams()["*"] || "all";
    const {
        filtersTags,
        addFilter,
        removeFilter,
        getFilter,
        removeAllFilters,
        filters,
        priceValue,
        setPriceValue,

        products,
        typeList,
        priceForFilter,
    } = useProduct();

    const handleChange = (event, newValue) => {
        setPriceValue(newValue);
    };
    useEffect(() => {
        setPriceValue(null);
    }, [priceForFilter]);

    useEffect(() => {
        if (typeList) {
            getFilter();
        }
        removeAllFilters();
        // eslint-disable-next-line
    }, [urlType, typeList, products]);

    const { getTranslateBlock } = useTranslate();
    const translate = getTranslateBlock("products");
    // console.log(priceForFilter);
    return (
        <div className="filter-container">
            <Cancel
                className="filters-cancel"
                onClick={() => {
                    document
                        .getElementsByClassName("filter-container")[0]
                        .classList.toggle("filter-container-active");
                }}
            />
            <div className="price">
                <h2>{translate.filters.price} </h2>
                <p>
                    {translate.filters.from}
                    <span>
                        {priceValue ? priceValue[0] : priceForFilter[0]}
                    </span>
                    - {translate.filters.to}
                    <span>
                        {priceValue ? priceValue[1] : priceForFilter[1]}
                    </span>
                </p>
                <Slider
                    getAriaLabel={() => "Цена"}
                    value={priceValue || priceForFilter}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={priceForFilter[0]}
                    max={priceForFilter[1]}
                    sx={{ color: "#d0593b" }}
                    step={25}
                />
            </div>
            <h2>{translate.filters.brand}</h2>

            {renderForOne()}
        </div>
    );

    function renderForOne() {
        return filtersTags.map((item, index) => {
            const id = item.split(" ").join("");

            return (
                <div className="option" key={index}>
                    <input
                        type="checkbox"
                        name={item}
                        id={id}
                        checked={filters.includes(item)}
                        onChange={({ target }) => {
                            if (target.checked) {
                                addFilter(target.name);
                            } else {
                                removeFilter(target.name);
                            }
                        }}
                    />
                    <label htmlFor={id}>{item}</label>
                </div>
            );
        });
    }
}

export default FilterContainer;
