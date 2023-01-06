import { useEffect, useState } from "react";
import {  useParams, useSearchParams } from "react-router-dom";
import useProduct from "../../hook/useProduct";
import useTranslate from "../../hook/useTranslate";
import LazyBlock from "./LazyBlock";





function ProductContainer(props) {
    const {currentItems, getPagination} = useProduct();

    const urlType = useParams()['*'] || 'all';
    // console.log(urlType);
    const [search] = useSearchParams();
    const searchPage = +(search.get("page")) || 1
    const {getTranslateBlock } = useTranslate()
    const translate = getTranslateBlock('products');
    

    return (
        <div className="products-container">
            
                <div className="btn-filters" onClick={()=>{document.getElementsByClassName('filter-container')[0].classList.toggle('filter-container-active')}}>
                    {translate.btn}
                </div>
                <div className="products-block">
                    {
                        renderProducts(currentItems)
                    }
                </div>
                {
                    getPagination(urlType, searchPage-1)
                }
            
        </div>
    )

    function renderProducts (items){
        console.log(items.length)
        if(items.length > 0){
            return items.map((item, index)=>{
                    return (
                        <LazyBlock  type={item.type} id={item.id} key={index}  img={item.img} title={item.title} price={item.price} />
                    )
                });
        }else{
            return <h1>Sorry !</h1>
        }
    }

}


export default ProductContainer;