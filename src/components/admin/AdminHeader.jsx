import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../Redux/userControl";
import { createUserAxiosRequest } from "../../requestMethods";

export default function AdminHeader() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const location = useLocation();

    const protectedRequest = createUserAxiosRequest();

    // console.log(location);

    useEffect(() => {
        // if(location.pathname !== '/admin'){
        protectedRequest
            .post("/check/")
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
                logoutUser(dispatch);
                navigate("/admin");
            });
        // }
    }, [location.pathname]);

    return (
        <>
            <div className="admin-header">
                <div className="center">
                    <ul>
                        <li
                            onClick={() => {
                                changeLocation("orders");
                            }}
                        >
                            Заказы
                        </li>
                        <li
                            onClick={() => {
                                changeLocation("products");
                            }}
                        >
                            Продукты
                        </li>
                        <li
                            onClick={() => {
                                changeLocation("settings");
                            }}
                        >
                            Настройки
                        </li>
                        <li
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            Открыть сайт
                        </li>

                        <li
                            onClick={async () => {
                                await logoutUser(dispatch);
                            }}
                        >
                            Выйти
                        </li>
                    </ul>
                </div>
            </div>
            <Outlet />
        </>
    );
    function changeLocation(url) {
        navigate("/admin/" + url);
    }
}
