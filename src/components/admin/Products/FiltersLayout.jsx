import { toast } from "react-toastify";
import { createUserAxiosRequest } from "../../../requestMethods";

export default function FiltersLayout({
    type,
    loadEvent,
    filters,
    setShowFiltersLayout,
}) {
    // console.log(loadEvent);
    const protectedRequest = createUserAxiosRequest();
    console.log(filters);
    return (
        <div className="filters-layout">
            <div className="filters-block">
                <div
                    className="close"
                    onClick={() => {
                        setShowFiltersLayout(false);
                    }}
                >
                    close
                </div>
                <h2>Настройка Фильтра: {returnFilterName(type)}</h2>
                <button className="btn add" onClick={addFilter}>
                    Добавить новый фильтр
                </button>
                <div className="list">{renderFiltersList(filters)}</div>
            </div>
        </div>
    );

    async function addFilter() {
        let name = "";

        if (type === "type") {
            const nameUa = window.prompt(
                `Укажите имя фильтра: ${returnFilterName(type)} по Украински`
            );
            if (!nameUa) return;
            const nameRu = window.prompt(
                `Укажите имя фильтра: ${returnFilterName(type)} по русски`
            );
            if (!nameRu) return;

            name = {
                ua: nameUa,
                ru: nameRu,
            };
        }

        if (type === "brand") {
            name = window.prompt(
                `Укажите имя фильтра: ${returnFilterName(type)}`
            );
        }

        try {
            const { data } = await protectedRequest.post(
                "/filters/?type=" + type,
                {
                    name,
                }
            );
            if (data.status) {
                toast.success(
                    `${
                        name?.ru ? name.ru : name
                    } добавлен в "${returnFilterName(type)}"`
                );
                loadEvent();
            }
        } catch (err) {
            console.log(err);
            toast.error("Ошибка при добавлении фильтра:" + type);
        }
    }

    function renderFiltersList(list) {
        if (list.length === 0) return <p>Пока нету фильтров</p>;
        return list.map((item, index) => {
            const name = type === "brand" ? item.name : item.name.ru;
            return (
                <div className="item" key={index}>
                    <div className="key">Checkbox</div>
                    <div className="key">{name}</div>
                    <div className="key">
                        <button className="delete">Удалить</button>
                    </div>
                </div>
            );
        });
    }

    function returnFilterName(type) {
        switch (type) {
            case "type":
                return "Тип";
            case "brand":
                return "Бренд";
            default:
                return "не знаю";
        }
    }
}
