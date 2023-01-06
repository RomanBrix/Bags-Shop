import React, { useState } from "react";
import Pagination from "../helpers/Pagination";
import productsJSON from './product.json';

export const ProductContext = React.createContext(null);



function ProductProvider({children}) {
    const [products] = useState(productsJSON);
    const [currentItems, setCurrentItems] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(9);

    const [filters, setFilters] = useState([])
    const [filtersTags, setFiltersTags] = useState([])

    const [priceValue, setPriceValue] = useState([1000, 69998]);
    
    let filteredProducts = products.map((item, index)=>{
      return item.filter((obj)=>{
        return obj.price >= priceValue[0] && obj.price <= priceValue[1]
      })
    });


    if(filters.length > 0){
      filteredProducts = filteredProducts.map((item)=>{
        const a = item.filter((obj)=>{
          return filters.includes(obj.brand)
        })
        return a;
      });
    }

    // console.log(filteredProducts);
    // console.log(currentItems);
    function addFilter(value) {
      setFilters((prev)=>{
        return [...prev, value];
      })
    }
    function removeFilter(value){
      const newFilter = filters.filter((item)=>{
        return item !== value;
      })

      setFilters(newFilter)
    }

    function removeAllFilters(value){
     
      setFilters([])
    }



    function getFilter(tag, type = 'all') {

        if(type === 'all'){
          const arr = []
          for(let i = 0; i < products.length; i++){
            for (let j = 0; j < products[i].length; j++) {
              arr.push(products[i][j][tag]); 
            }
          }
          setFiltersTags(arr);
        }else{
          const arr = [];
          let number = 0;
          switch (type) {
            case 'backpacks':
              number = 1
              break;
            case 'wallets':
              number = 2
              break;
          
            default:
              number = 0
              break;
          }

          for (let i = 0; i < products[number].length; i++) {
            arr.push(products[number][i][tag]);
          }
          setFiltersTags(arr);
        }

        
    }


    function getPagination( type, urlItemOffset = 0) {
      let items;
      switch (type) {
        case 'bugs':
          items =  filteredProducts[0];
          break;

        case 'backpacks':
          items =  filteredProducts[1];
          break;

        case 'wallets':
          items =  filteredProducts[2];
          break;
      
        default:
         
          items =  [...filteredProducts[0], ...filteredProducts[1], ...filteredProducts[2]];
          break;
      }
      
      return <Pagination 
                itemsPerPage={itemsPerPage} 
                items={items} 
                urlItemOffset={urlItemOffset}
                setCurrentItems={setCurrentItems}
                filters={filters}
                />
    }

    function getSingleProduct(id,type) {
      
      for (let i = 0; i < products[type].length; i++) {
        if(+id === products[type][i].id) return products[type][i]
      }
      return {
        error: 'No Match'
      }
    }
    
    const val = {
        products,
        currentItems,
        setItemsPerPage,
        getPagination,
        filtersTags, getFilter, addFilter, removeFilter, removeAllFilters, filters,
        getSingleProduct,
        priceValue, setPriceValue
      };
      return (
        <ProductContext.Provider value={val}>{children}</ProductContext.Provider>
      );
}
export default ProductProvider;

