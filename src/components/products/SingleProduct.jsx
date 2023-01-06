import { lazy, Suspense, useState } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProduct from "../../hook/useProduct";
import { ReactComponent as Loader } from '../svg/hearts.svg'
import Cookies from "js-cookie";
import useTranslate from "../../hook/useTranslate";

function SingleProduct(props) {
  const id = useParams()["id"] || "all";
  const type = useParams()["type"] || "all";
  const navigate = useNavigate();
  const { getSingleProduct } = useProduct();

  const [product, setProduct] = useState(getSingleProduct(id, type));
  const [activeImg, setActiveImg] = useState(product.img);
  const [varinatName, setVarinatName] = useState('');

  const MainImg = getLazyImage({ src: activeImg, alt: "" });
  const VariantImg = product.variantImg ? 
  product.variantImg.map((item, index) => {
    return getLazyImage({ src: item, alt: "", dataSrc: item, dataVariant: product.variantInfo[index] });
  }) : []

  const {language } = useTranslate()
  // console.log(language)
  if (product.error) {
    return (
      <div className="single-product forContainer">
        
        <div className="container">
          <h1>No match, sorry</h1>
          <div
            className="btn"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="single-product forContainer">
      <div className="container">
     
        <div className="main-img" >
          <Suspense fallback={<div className="loading"><Loader/></div>}>
            <MainImg />
          </Suspense>
        </div>
        <div className="info">
          <h2>{product.title}</h2>




          

          <div className="info-item">
                <div className="headline">Бренд</div>
                <div className="content">{product.brand}</div>
        </div>
        { renderContent(product.additional_info)}




            {
                VariantImg.length > 1 ?
                <>
                    <p className="var-head">{language == 'ua' ? 'варіант' : 'Вариант'}:</p>
                    <div className="variants">
                        {VariantImg.map((item, index) => {
                        return (
                            <div className="variant" key={index} onClick={({target})=>{ changeImg(target)}}>
                            <Suspense fallback={<div className="loading"><Loader/></div>} >
                                {React.createElement(item)}
                            </Suspense>
                            </div>
                        );
                        })}
                    </div>
                </>
                : <></>
            }

            <div className="bottom">
                <div className="price">{product.price} UAH.</div>
                <div className="btn-buy" onClick={()=>{addtoCart()}}>{language == 'ua' ?  'Додати до кошика' : 'Добавить в корзину'}</div>
            </div>
          
        </div>
      </div>
    </div>
  );


  function addtoCart(){
    const activeVarian = document.getElementsByClassName('active-variant');
    if(!activeVarian[0]){
      language == 'ua' ? alert('Потрібно вибрати варіант продукту') : alert('Нужно выбрать вариант продукта')
      return;
    }

    const cookieBuy = Cookies.get('buy')
    const toBuy = cookieBuy ? JSON.parse(cookieBuy) : [];

    let itemIndex = null;
    const prod = toBuy.filter((item, index)=>{
      if(item.id == id && item.typeName == varinatName){
        itemIndex = index;
        return true
      }
    })

    if(itemIndex !== null){
      toBuy[itemIndex] = {
        ...toBuy[itemIndex],
        count: toBuy[itemIndex].count + 1
      }
    }else{
      toBuy.push(
        {
          id,
          typeName: varinatName,
          img:  activeImg,
          price: product.price,
          count: 1
        }
      )
    }

    Cookies.set('buy', JSON.stringify(toBuy))

  }

  function renderContent(info) {
      const returnedInfo = [];
      for (const key in info) {
          let headLine = '';
          let text = info[key];

          switch (key) {
              case 'height':
                headLine =  language == 'ua' ? 'Висота:' : 'Высота'
                  break;
              case 'width':
                headLine =  language == 'ua' ? 'Ширина:' : 'Ширина'
                  break;
              case 'bottomWidth':
                headLine =   language == 'ua' ? 'Ширина по дну:' : 'Ширина по дну:'
                  break;
              case 'handleLength':
                headLine =   language == 'ua' ? 'Довжина ручки:' : 'Длина ручки:'
                  break;
              case 'producingCountry':
                headLine =   language == 'ua' ? 'Країна виробник:' : 'Страна производитель:'
                  break;
              case 'material':
                headLine =   language == 'ua' ? 'Матеріал:' : 'Материал:'
                  break;
          
              default:
                headLine = '';
                text = ''
                  break;
          }
          returnedInfo.push(
            <div className="info-item" key={key+info[key]}>
                <div className="headline">{headLine}</div>
                <div className="content">{text}</div>
            </div>
          )
      }
      return returnedInfo;
    
  }
  function changeImg(target) {
    if(target.nodeName !== 'IMG') return;
    
    const src = target.dataset.src;
    const variantName = target.dataset.variant;
    console.log(src, variantName);
    const activeVarian = document.getElementsByClassName('active-variant');
    if(activeVarian[0]) activeVarian[0].classList.remove('active-variant');
    
    target.parentElement.classList.toggle("active-variant");
    setVarinatName(variantName);
    setActiveImg(src);
  }
}



const getImageComponent =
  ({ src, alt, dataSrc,  dataVariant }) =>
  () =>
    <img className="variant-img" src={src} alt={alt} data-src={dataSrc} data-variant={dataVariant}/>;

const getLazyImage = ({ src, alt = "", dataSrc='',  dataVariant=''}) =>
  lazy(
    () =>
      new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
          resolve({
            default: getImageComponent({ src, alt, dataVariant, dataSrc}),
          });
        };
        image.onerror = reject;
        image.src = src;
      })
  );

export default SingleProduct;
