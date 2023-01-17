import { useEffect } from "react";
// import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Routes, Route, useLocation } from "react-router-dom";
import AdminContainer from "./components/admin";
import CartContainer from "./components/cart";
import Contacts from "./components/contacts";
import Layout from "./components/layouts";
import MainPage from "./components/main";
import Product from "./components/products";
import SingleProduct from "./components/products/SingleProduct";
import Success from "./components/Success";

function App() {
    const location = useLocation();
    // console.log(location);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // console.log(user);
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path="/shop/*" element={<Product />} />
                    <Route path="/product/:id" element={<SingleProduct />} />
                    <Route path="/cart/*" element={<CartContainer />} />
                    <Route path="/contacts" element={<Contacts />} />

                    <Route path="/return" element={<h1>return</h1>} />
                    <Route path="/terms" element={<h1>terms</h1>} />
                    <Route path="/delivery" element={<h1>delivery</h1>} />

                    <Route path="/success" element={<Success />} />

                    <Route path="*" element={<h1>Not found</h1>} />
                </Route>
                <Route path="/admin/*" element={<AdminContainer />} />
            </Routes>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}

export default App;
