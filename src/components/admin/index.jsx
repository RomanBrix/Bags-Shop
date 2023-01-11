// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import Enter from "./Enter";
import Products from "./Products";
// import Products from "./Products";
import Settings from "./Settings";
// import Cart from "./cart";

function AdminContainer(props) {
    const user = useSelector(
        (state) => state.persistedReducer.user.currentUser
    );

    // <Navigate
    return (
        <Routes>
            <Route
                index
                element={
                    user && user.isAdmin ? (
                        <Navigate to="/admin/orders" />
                    ) : (
                        <Enter />
                    )
                }
            />
            <Route element={<AdminHeader />}>
                <Route
                    path="orders"
                    element={
                        user && user.isAdmin ? (
                            <h1>orders</h1>
                        ) : (
                            <Navigate to="/admin" />
                        )
                    }
                />
                <Route
                    path="products/*"
                    element={
                        user && user.isAdmin ? (
                            <Products />
                        ) : (
                            <Navigate to="/admin" />
                        )
                    }
                />
                <Route
                    path="settings"
                    element={
                        user && user.isAdmin ? (
                            <Settings user={user} />
                        ) : (
                            <Navigate to="/admin" />
                        )
                    }
                />
            </Route>
            <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    );
}

export default AdminContainer;
