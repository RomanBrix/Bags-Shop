import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../hook/useTranslate";
import { ReactComponent as Cancel } from '../svg/cancel.svg'



function Cart(props) {
    const cookieBuy = Cookies.get('buy');
    const navigate = useNavigate();
    useEffect(()=>{
        // console.log(cookieBuy);
        if(!cookieBuy){
            navigate('/shop');
        }
    },[cookieBuy])

    


    const [toBuy, setToBuy] = useState(cookieBuy ? JSON.parse(cookieBuy) : []);
    useEffect(()=>{
        // console.log(cookieBuy);
        if(toBuy.length === 0){
            navigate('/shop');
        }
    },[toBuy])
     
    const {getTranslateBlock } = useTranslate();
    
    const translate = getTranslateBlock('cart');

    console.log(toBuy);
    let totalSumm = 0;

    return(
        <div className="cart forContainer">
            <div className="container">
                <div className="items-container">
                    {renderToBuy()}
                </div>
                <div className="total-price">
                    <span>
                        {translate.total} : {totalSumm} UAH
                    </span>
                </div>
                <div className="btns">
                    <div className="btn btn-reload" onClick={()=>{navigate('/shop');}}>{translate.btnMore}</div>
                    <div className="btn btn-buy" onClick={()=>{buy()}}>{translate.btnBuy}</div>
                </div>
            </div>
        </div>
    )

    function buy() {
        alert('OK')
    }



    function deleteBuyElement(index) {
        const newToBuy = toBuy.filter((item, ind)=>{
          return ind !== index
        })
        // 
        setToBuy(newToBuy);
        Cookies.set('buy', JSON.stringify(newToBuy))

        console.log(toBuy)
        console.log(newToBuy)
    }

   

    function renderToBuy(){
        return toBuy.map((item, index)=>{
            totalSumm = totalSumm + (+item.count * +item.price);

            return <div className="buy-item" key={index}>
                <div className="left">
                    <div className="img" style={{backgroundImage: `url(${item.img})`}}>
                        {/* <img src={item.img} alt={item.typeName} /> */}
                    </div>
                    <div className="name">
                        {item.typeName}
                    </div>
                </div>
                <div className="right">
                    <div className="counter">
                        {item.count}
                    </div>
                    <div className="price">
                        {+item.count * +item.price} UAH
                    </div>
                    <div className="cancel">
                        <Cancel onClick={()=>{deleteBuyElement(index)}}/>
                    </div>
                </div>
                

            </div>    
        })
    }
}



export default Cart;