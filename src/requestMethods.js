import axios from "axios";

const BASE_URL = "http://localhost:1488/api";

let user = JSON.parse(localStorage.getItem("persist:root"))?.user;
let currentUser = user && JSON.parse(user).currentUser;
let TOKEN = currentUser?.token;
let USERNAME = currentUser?.username;

export function changeToken(token = undefined, username = undefined) {
    TOKEN = token;
    USERNAME = username;
    console.log(TOKEN);
    return true;
}

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export function createUserAxiosRequest(url = BASE_URL) {
    return axios.create({
        baseURL: url,
        headers: { token: `${USERNAME} ${TOKEN}` },
        rejectUnauthorized: false,
    });
}
