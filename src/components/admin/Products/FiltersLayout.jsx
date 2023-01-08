export default function FiltersLayout({
    type,
    loadEvent,
    filters,
    setShowFiltersLayout,
}) {
    console.log(loadEvent);
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

    function addFilter() {
        const name = window.prompt(
            `Укажите имя фильтра: ${returnFilterName(type)}`
        );
        if (!name) return;
    }

    function renderFiltersList(list) {
        if (list.length === 0) return <p>Пока нету фильтров</p>;
        return list.map((item, index) => {
            <div className="item" key={index}>
                <div className="key">Checkbox</div>
                <div className="key">{item.name}</div>
                <div className="key">
                    <button className="delete">Удалить</button>
                </div>
            </div>;
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
