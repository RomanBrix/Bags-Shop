import { Route, Routes } from "react-router-dom";
import Cart from "./cart";



function CartContainer(props) {
    

    return(
        <Routes>
            <Route index element={<Cart/>} />

            <Route path="*" element={<h1>Not Found</h1>}/>
        </Routes>
    )
}



export default CartContainer;