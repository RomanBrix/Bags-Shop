import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserAxiosRequest } from "../../../requestMethods";
import Select, { AriaOnFocus } from "react-select";

export default function SingleOrder() {
    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState(null);
    const [saveStatus, setSaveStatus] = useState(false);
    // const [totalSumm, setTotalSumm] = useState(0);

    const { id } = useParams();
    const navigate = useNavigate();
    const protectedRequest = createUserAxiosRequest();

    if (!id) navigate(-1);
    useEffect(() => {
        //load
        loadOrder();
    }, []);
    useEffect(() => {
        if (order) {
            if (status.value !== order.status) {
                setSaveStatus(true);
            } else {
                setSaveStatus(false);
            }
        }
    }, [status]);

    // console.log(order);

    const statusOptions = [
        {
            value: "new",
            label: "Новый",
        },
        {
            value: "paid",
            label: "Оплачений",
        },
        {
            value: "cancel",
            label: "Отменен",
        },
        {
            value: "done",
            label: "Выполнен",
        },
        {
            value: "delivery",
            label: "Отправлен",
        },
    ];

    if (!order) {
        return (
            <div className="admin loading-page">
                <div className="center">
                    <h1>Загружаем...</h1>
                </div>
            </div>
        );
    }

    // let totalSumm = 0;
    return (
        <div className="admin">
            <div className="center">
                <h1>Заказ #{order.id}</h1>

                <div className="block ">
                    <h2>1. Информация о клиенте</h2>
                    <ul>
                        <li>
                            ФИО:
                            <span>
                                {order.user.secondname} {order.user.name}
                            </span>
                        </li>
                        <li>
                            Номер: <span>{order.user.phone}</span>
                        </li>
                        <li>
                            Адрес: <span>{order.user.address}</span>
                        </li>
                    </ul>
                </div>

                <div className="block">
                    <h2>2. Информация о заказе</h2>
                    <ul>
                        <li>
                            Статус:
                            <span className={order.status}>
                                {getStatus(order.status)}
                            </span>
                        </li>
                        <li>
                            Оплата: <span>{getPayName(order.pay)}</span>
                        </li>
                        <li>
                            Доставка:
                            <span>{getDeliveryName(order.delivery)}</span>
                        </li>
                    </ul>
                    <h3>Изменить статус:</h3>
                    <div className="form">
                        <Select
                            inputId="aria-status"
                            name="aria-status"
                            onChange={(data) => {
                                // console.log(a);
                                setStatus(data);
                            }}
                            value={status}
                            options={statusOptions}
                        />
                        {saveStatus && (
                            <button className="save" onClick={changeStatus}>
                                Обновить статус
                            </button>
                        )}
                    </div>
                </div>

                <div className="block wide-block">
                    <h2>Продукты</h2>
                    {/* <h3>
                        Общая сума: <span>{totalSumm}</span>
                    </h3> */}
                    <div className="list">
                        <div className="item">
                            <div className="key">Фото</div>
                            <div className="key">Название</div>
                            <div className="key">Бренд</div>
                            <div className="key">Вариант</div>
                            <div className="key">Кол-Во</div>
                            <div className="key">Цена/шт</div>
                            <div className="key">Сумма</div>
                        </div>
                        {renderProductList()}
                        {renderLastField()}
                    </div>
                </div>
            </div>
        </div>
    );

    function renderLastField() {
        const data = order.products
            .map((product) =>
                product.variants.reduce(
                    (acc, curr) => {
                        return {
                            summ: acc.summ + curr.price * curr.quanity,
                            quanity: acc.quanity + +curr.quanity,
                        };
                    },
                    { summ: 0, quanity: 0 }
                )
            )
            .reduce(
                (acc, curr) => {
                    // console.log(curr);
                    return {
                        summ: acc.summ + curr.summ,
                        quanity: acc.quanity + curr.quanity,
                    };
                },
                { summ: 0, quanity: 0 }
            );
        // console.log(data);

        return (
            <div className="item">
                <div className="key">-</div>
                <div className="key">Итого:</div>
                <div className="key">-</div>
                <div className="key">-</div>
                <div className="key">{data.quanity}</div>
                <div className="key">-</div>
                <div className="key">{data.summ}</div>
            </div>
        );
    }
    function renderProductList() {
        const renderArray = [];
        // let total = 0;

        for (let i = 0; i < order.products.length; i++) {
            const product = order.products[i];
            // let summ = 0;
            // console.log(first)
            product.variants.map((variant) => {
                // summ += +variant.price * variant.quanity;
                // console.log(totalSumm);
                renderArray.push(
                    <div className="item" key={variant._id}>
                        <div className="key">
                            <img
                                src={
                                    variant.imgIndex !== null
                                        ? product.imgs[variant.imgIndex]
                                        : product.imgs[0]
                                }
                                alt=""
                            />
                        </div>
                        <div className="key">{product.title}</div>
                        <div className="key">{product.brand}</div>
                        <div className="key">
                            <div
                                className="variant-color"
                                style={{ backgroundColor: variant.color }}
                            />
                        </div>
                        <div className="key">{variant.quanity}</div>
                        <div className="key">{variant.price}</div>
                        <div className="key">
                            {variant.price * variant.quanity}
                        </div>
                    </div>
                );
            });
            // total += summ;
        }

        // totalSumm = total;
        // console.log(total);
        // setTotalSumm(total);
        return renderArray;
    }

    function changeStatus() {
        protectedRequest
            .post("/order/status", { id: order._id, status: status.value })
            .then(({ data }) => {
                if (data.status) {
                    loadOrder();
                    toast.success("Статус изменен");
                } else {
                    toast.warning("Не удалось...");
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Ошибка! Обратитесь к амину");
            });
    }

    function loadOrder() {
        protectedRequest
            .get("/order/" + id)
            .then(({ data }) => {
                if (data.status) {
                    setOrder(data.order);
                    setStatus({
                        value: data.order.status,
                        label: getStatus(data.order.status),
                    });
                } else {
                    toast.warn("Заказ не найден");
                    navigate("..");
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Ошибка загрузки данных");
                navigate("..");
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
    function getDeliveryName(delivery) {
        switch (delivery) {
            case "courier":
                return "Курьером";
            case "np":
                return "Новой Почтой";
            case "own":
                return "Самовывоз";

            default:
                return "Не выбрал";
            // break;
        }
    }
    function getPayName(pay) {
        switch (pay) {
            case "ondelivery":
                return "При доставке";
            case "card":
                return "Картой на сайте";

            default:
                return "Не выбрал";
            // break;
        }
    }
}
