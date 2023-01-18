import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { prettyDate } from "../../../helpers/helpers";
import { createUserAxiosRequest } from "../../../requestMethods";

export default function AllOrders() {
    const [orders, setOrders] = useState(null);
    const protectedRequest = createUserAxiosRequest();
    useEffect(() => {
        loadOrders();
    }, []);

    const navigate = useNavigate();
    console.log(orders);

    if (!orders) {
        return (
            <div className="admin loading-page">
                <div className="center">
                    <h1>Загружаем...</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="admin">
            <div className="center">
                {/* <h1>Orders</h1> */}
                <div className="product-list">
                    <div className="item">
                        <div className="section">ID</div>
                        <div className="section">ФИО</div>
                        <div className="section">Номер</div>
                        <div className="section">Сумма</div>
                        <div className="section">Статус</div>
                        <div className="section">Дата</div>
                    </div>
                    {renderOrders(orders)}
                </div>
            </div>
        </div>
    );

    function renderOrders(orders) {
        return orders.map((item, index) => {
            const summ = item.products
                .map((product) =>
                    product.variants.reduce(
                        (acc, curr) => acc + curr.price * curr.quanity,
                        0
                    )
                )
                .reduce((acc, curr) => acc + curr, 0);

            return (
                <div
                    className="item"
                    onClick={() => {
                        navigate("./" + item._id);
                    }}
                    key={index}
                >
                    <div className="section">{item.id}</div>
                    <div className="section">
                        {item.user.secondname} {item.user.name}
                    </div>
                    <div className="section"> {item.user.phone}</div>
                    <div className="section">{summ}</div>
                    <div className="section">
                        <span className={item.status + " status_span"}>
                            {getStatus(item.status)}
                        </span>
                    </div>
                    <div className="section">
                        {prettyDate(item.createdAt)}/
                        {prettyDate(item.createdAt, "h:m")}
                    </div>
                </div>
            );
        });
    }

    function getStatus(status) {
        switch (status) {
            case "new":
                return "Новый";

            case "paid":
                return "Оплачений";

            case "cancel":
                return "Отменен";

            case "done":
                return "Выполнен";

            case "delivery":
                return "Отправлен";

            default:
                return "Нету";
        }
    }

    async function loadOrders() {
        try {
            const { data } = await protectedRequest.get("/order/all");
            // console.log(data);
            setOrders(data.orders);
        } catch (err) {
            toast.error("Ошибка загрузки");
        }
    }
}
