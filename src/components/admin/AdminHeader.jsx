import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../../Redux/userControl";

export default function AdminHeader() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <>
            <div className="admin-header">
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
            <Outlet />
        </>
    );
    function changeLocation(url) {
        navigate("/admin/" + url);
    }
}
