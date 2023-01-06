import { useNavigate } from "react-router-dom";
import useTranslate from "../../hook/useTranslate";


function MainPage(props) {
    
    const navigate = useNavigate();
    const { getTranslateBlock } = useTranslate()

    const translate = getTranslateBlock('main');
    
    return (
        <>
        <div className="mainPage forContainer intro" style={{backgroundImage: 'url("/src/main/intro.jfif")'}}>
            <div className="container">
                    <div className="top">
                        <h1>New collection</h1>
                        <h2>Winter 2022</h2>
                    </div>
                    <div className="btn btn-go" onClick={()=>{navigate('/shop')}}>
                        <span>Shop</span>
                        <span>now</span>
                    </div>
            </div>
        </div>
        <div className="mainPage forContainer plus-intro">
            <div className="container">
                <div className="block" style={{backgroundImage: 'url("/src/main/bag.jfif")'}} onClick={()=>{navigate('/shop/bags')}}>
                   <p>{translate.bag}</p>
                </div>
                <div className="block" style={{backgroundImage: 'url("/src/main/backpack.jfif")'}} onClick={()=>{navigate('/shop/backpacks')}}>
                   <p>{translate.backpack}</p>
                </div>
                <div className="block" style={{backgroundImage: 'url("/src/main/wallet.jfif")'}} onClick={()=>{navigate('/shop/wallets')}}>
                   <p>{translate.wallets}</p>
                </div>
            </div>
        </div>
        </>
    )
}


export default MainPage;