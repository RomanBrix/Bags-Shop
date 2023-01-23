// import { useEffect, useState } from "react";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useProduct from "../../hook/useProduct";
import useTranslate from "../../hook/useTranslate";
import LazyBlock from "./LazyBlock";

function ProductContainer(props) {
    const { currentItems, getPagination, changeActiveType } = useProduct();

    const urlType = useParams()["type"];
    // console.log(urlType);
    const [search] = useSearchParams();
    const searchPage = +search.get("page") || 1;
    const { getTranslateBlock } = useTranslate();
    const translate = getTranslateBlock("products");
    useEffect(() => {
        changeActiveType(urlType || "");
    }, [urlType]);

    // console.log(currentItems);

    return (
        <div className="products-container">
            <div
                className="btn-filters"
                onClick={() => {
                    document
                        .getElementsByClassName("filter-container")[0]
                        .classList.toggle("filter-container-active");
                }}
            >
                {translate.btn}
            </div>
            <div className="products-block">{renderProducts(currentItems)}</div>
            {getPagination(urlType, searchPage - 1)}
        </div>
    );

    function renderProducts(items) {
        // console.log(items.length);
        if (items.length > 0) {
            return items.map((item, index) => {
                const priceArr = item.variants
                    .map((item) => {
                        return item.price;
                    })
                    .sort((a, b) => a - b);
                let price =
                    priceArr.length > 1 &&
                    priceArr[0] !== priceArr[priceArr.length - 1]
                        ? `${priceArr[0]} - ${priceArr[priceArr.length - 1]}`
                        : priceArr[0];
                return (
                    <LazyBlock
                        id={item._id}
                        key={index}
                        img={item.imgs[0]}
                        title={item.title}
                        price={price}
                    />
                );
            });
        } else {
            return <h1>0 Products yet!</h1>;
        }
    }
}

export default ProductContainer;
