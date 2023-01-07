export function prettyDate(date = new Date(), type = "dd.mm.yyyy") {
    let d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    const months = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ];
    const monthName = months[month - 1];
    if (+month < 10) month = "0" + month;
    if (+day < 10) day = "0" + day;
    if (+hours < 10) hours = "0" + hours;
    if (+minutes < 10) minutes = "0" + minutes;
    if (+seconds < 10) seconds = "0" + seconds;
    switch (type) {
        case "dd.mm.yyyy":
            return `${day}.${month}.${year}`;
        case "h:m":
            return `${hours}:${minutes}`;
        case "dd.mm.yyyy h:m":
            return `${day}.${month}.${year} ${hours}:${minutes}`;
        case "DD":
            return day;
        case "YYYY":
            return year;
        case "MM":
            return monthName;
        case "mm":
            return month;

        default:
            return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    }
}
