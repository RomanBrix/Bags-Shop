import React, { useEffect, useState } from "react";
import Pagination from "../helpers/Pagination";
import { publicRequest } from "../requestMethods";
import productsJSON from "./product.json";

export const ProductContext = React.createContext(null);

function ProductProvider({ children }) {
    const [allProducts, setAllProducts] = useState(productsJSON);
    const [products, setProducts] = useState(productsJSON);

    const [typeList, setTypeList] = useState(null);
    const [brandList, setBrandList] = useState(null);
    const [priceForFilter, setPriceForFilter] = useState([0, 100]);

    const [currentItems, setCurrentItems] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [activeType, setActiveType] = useState("");

    const [filters, setFilters] = useState([]);
    const [filtersTags, setFiltersTags] = useState([]);

    const [priceValue, setPriceValue] = useState(null);

    useEffect(() => {
        getAllProducts();

        publicRequest
            .get("/filters/?type=type")
            .then(({ data }) => {
                setTypeList(data.type);
            })
            .catch((err) => {
                console.log(err);
            });
        publicRequest
            .get("/filters/?type=brand")
            .then(({ data }) => {
                setBrandList(data.brand);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        // console.log("here");
        if (typeList) {
            if (!activeType || activeType === "") {
                // console.log("tyyt");
                setProducts(allProducts);
                // console.log("all");
            } else {
                // console.log(activeType);
                // console.log(typeList);
                const type = typeList.filter((item) => item._id === activeType);
                // console.log(type);
                const typedProducts = allProducts.filter(
                    (item) => item.type.ua === type[0].name.ua
                );
                // console.log(typedProducts);

                setProducts(typedProducts);
            }
        }
    }, [activeType, typeList]);

    useEffect(() => {
        if (products.length > 0) {
            let prices = [];
            products.forEach((item) => {
                item.variants.forEach((variant) => prices.push(variant.price));
            });
            prices.sort((a, b) => a - b);

            // console.log(prices);
            if (prices.length > 1) {
                setPriceForFilter([prices[0], prices[prices.length - 1]]);
            } else {
                setPriceForFilter([0, prices[0] || 10]);
            }
            // setPriceValue(null)
        }
        // setPriceForFilter
    }, [products]);

    // let filteredProducts = products.map((item, index) => {
    //     return item.filter((obj) => {
    //         return obj.price >= priceValue[0] && obj.price <= priceValue[1];
    //     });
    // });

    let filteredProducts = products.filter((product) => {
        //ПОМЕНЯТЬ ФИЛЬР ПО ЦЕНЕ
        // console.log(product);
        const priceArr = product.variants
            .map((item) => {
                return item.price;
            })
            .sort((a, b) => a - b);
        const minPrice = priceValue ? priceValue[0] : priceForFilter[0];
        const maxPrice = priceValue ? priceValue[1] : priceForFilter[1];
        // console.log(product);
        // console.log(minPrice);
        // console.log(maxPrice);
        return (
            priceArr[0] >= minPrice && priceArr[priceArr.length - 1] <= maxPrice
        );
    });

    if (filters.length > 0) {
        filteredProducts = filteredProducts.filter((obj) => {
            return filters.includes(obj.brand);
        });
    }

    // console.log(filteredProducts);
    // console.log(currentItems);
    function addFilter(value) {
        setFilters((prev) => {
            return [...prev, value];
        });
    }
    function removeFilter(value) {
        const newFilter = filters.filter((item) => {
            return item !== value;
        });

        setFilters(newFilter);
    }

    function removeAllFilters(value) {
        setFilters([]);
    }

    function changeActiveType(type) {
        setActiveType(type);
    }

    function getFilter() {
        const brands = products
            .map((item) => item.brand)
            .filter((item, index, self) => self.indexOf(item) === index);
        // console.log(brands);
        setFiltersTags(brands);
    }

    function getPagination(type, urlItemOffset = 0) {
        return (
            <Pagination
                itemsPerPage={itemsPerPage}
                items={filteredProducts}
                urlItemOffset={urlItemOffset}
                setCurrentItems={setCurrentItems}
                filters={filters}
            />
        );
    }

    function getSingleProduct(id) {
        const product = allProducts.filter((item) => item._id === id);

        if (product.length === 1) {
            return product[0];
        }
        return {
            error: "No Match",
        };
    }

    function getAllProducts() {
        publicRequest.get("/products/all").then(({ data }) => {
            if (data.status) {
                // console.log(data.products);
                setAllProducts(data.products);
            } else {
                setAllProducts([]);
            }
        });
    }

    const val = {
        products,
        currentItems,
        setItemsPerPage,
        getPagination,
        filtersTags,
        getFilter,
        addFilter,
        removeFilter,
        removeAllFilters,
        filters,
        getSingleProduct,

        priceValue,
        setPriceValue,
        changeActiveType,
        typeList,
        priceForFilter,
        setPriceForFilter,
    };
    return (
        <ProductContext.Provider value={val}>
            {children}
        </ProductContext.Provider>
    );
}
export default ProductProvider;
