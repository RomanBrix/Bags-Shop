import { Route, Routes } from "react-router-dom";
import Cart from "./cart";
import UserInfo from "./UserInfo";

function CartContainer(props) {
    return (
        <Routes>
            <Route index element={<Cart />} />
            <Route path="/user" element={<UserInfo />} />

            <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    );
}

export default CartContainer;
