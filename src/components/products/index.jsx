import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import useProduct from "../../hook/useProduct";
import FilterContainer from "./FilterContainer";
import ProductContainer from "./ProductContainer";






function Product(props) {
    const { getFilter } = useProduct();
    // const [filtersTags] = useState( getFilter('brand'));
    
    
    // console.log(filtersTags)
    // console.log(urlType)
    return(
        <div className="product forContainer">
            <div className="container">
                <div className="filters">
                   <FilterContainer/>
                </div>
                <Routes>
                    <Route index element={<ProductContainer/>} />
                    <Route path="bags" element={<ProductContainer/>}/>
                    <Route path="backpacks" element={<ProductContainer/>}/>
                    <Route path="wallets" element={<ProductContainer/>}/>
                </Routes> 
            </div>
        </div>       
    )
}









export default Product;