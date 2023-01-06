import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../../hook/useProduct";
import useTranslate from "../../hook/useTranslate";

import { ReactComponent as Cancel } from '../svg/cancel.svg'

function valuetext(value) {
    return `${value} UAH`;
  }


function FilterContainer(props) {
    const urlType = useParams()['*'] || 'all';
    const {filtersTags, addFilter, removeFilter, getFilter, removeAllFilters, filters, priceValue , setPriceValue} = useProduct();
    
    
    const handleChange = (event, newValue) => {
        setPriceValue(newValue);
      };
    const handleChangeInput = (target, pos) => {
        setPriceValue((prevv)=>{
            const val = +target.value;
            const newArr = prevv;
            if(pos == 0){
                if(val > 1000 && val < prevv[1]){
                    newArr[pos] = val;
                }
            }else{
                if(val < 99999 && val > prevv[0]){
                    newArr[pos] = val;
                }
            }
            console.log(newArr)
            
            return newArr;
        });
      };
    
    useEffect(()=>{
        getFilter('brand', urlType);
        removeAllFilters()
    }, [urlType])
    
    
    const {getTranslateBlock } = useTranslate()
    const translate = getTranslateBlock('products');
    

    return (
        <div className="filter-container">
                <Cancel className="filters-cancel" onClick={()=>{document.getElementsByClassName('filter-container')[0].classList.toggle('filter-container-active')}}/>
                <div className="price">
                    <h2>{translate.filters.price} </h2>
                    <p>{translate.filters.from} 
                        <span>{priceValue[0]}</span>
                         - {translate.filters.to}  
                         <span>{priceValue[1]}</span>
                    </p>
                <Slider
                    getAriaLabel={() => 'Цена'}
                    value={priceValue}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={1000}
                    max={69999}
                    step={500}
                />
                </div>
                <h2>{translate.filters.brand}</h2>
                
                {
                    renderForOne()
                }
        </div>
    )


    function renderForOne() {
        
        return filtersTags.map((item, index)=>{
            const id = item.split(' ').join('');

            return <div className="option" key={index}>
                <input type="checkbox" name={item} id={id} checked={filters.includes(item)}  onChange={({target})=>{
                    if(target.checked){
                        addFilter(target.name);
                    }else{
                        removeFilter(target.name);
                    }
                }}/>
                <label htmlFor={id}>{item}</label>
            </div>
        })
    }
}


export default FilterContainer;