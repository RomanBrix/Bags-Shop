import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { prettyDate } from "../../helpers/helpers";
import { logoutUser } from "../../Redux/userControl";
import { createUserAxiosRequest } from "../../requestMethods";

export default function Settings({ user }) {
    const [inputs, setInputs] = useState({
        username: user.username,
        password: "",
    });
    const [userList, setUserList] = useState(null);
    const protectedRequest = createUserAxiosRequest();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchUserList();
        // eslint-disable-next-line
    }, []);
    return (
        <div className="admin">
            <div className="center">
                <h1>Settings</h1>
                <div className="block">
                    <h2>Изменить логин и пароль</h2>
                    <div className="form">
                        <div className="inputs">
                            <input
                                type="text"
                                id="username"
                                value={inputs.username}
                                onChange={changeInputs}
                            />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="inputs">
                            <input
                                type="text"
                                id="password"
                                value={inputs.password}
                                onChange={changeInputs}
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                        <button
                            className={`btn ${
                                inputs.username !== user.username ||
                                inputs.password.length > 3
                                    ? ""
                                    : "disable"
                            }`}
                            onClick={saveUserInfo}
                        >
                            Сохранить
                        </button>
                    </div>
                </div>

                <div className="block">
                    <h2>Все пользователи</h2>
                    <button className="btn" onClick={addNewUser}>
                        Добавить пользователя
                    </button>
                    <div className="list userList">
                        {userList ? (
                            renderUserList(userList)
                        ) : (
                            <p className="loading-inline">Загружаем...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    async function addNewUser() {
        const username = window.prompt("Укажите username");
        if (!username) return;
        const password = window.prompt("Укажите password");
        if (!password) return;

        try {
            const res = await protectedRequest.post("/user/add", {
                username,
                password,
            });
            if (res.data.status) {
                toast.success("Админ добавлен!");
                fetchUserList();
            }
            console.log(res);
        } catch (err) {
            console.log(err);
            toast.error("Ошибка! Скорее всего такой пользователь уже есть!");
        }
    }

    function renderUserList(list) {
        if (list.length < 1) return <p>Нету других пользователей</p>;

        console.log(list);
        return list.map((item, index) => {
            return (
                <div className="item" key={index}>
                    <div className="key">{item.username}</div>
                    <div className="key">{prettyDate(item.createdAt)}</div>
                    <div className="key">
                        <button
                            className="delete"
                            onClick={() => {
                                deleteUsr(item._id, item.username);
                            }}
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            );
        });
    }

    async function deleteUsr(id, name) {
        if (window.confirm("Удалить?")) {
            try {
                const res = await protectedRequest.delete("/user/" + id);
                if (res.data.status) {
                    toast.success(`Пользователь "${name}" был удален!`);
                    fetchUserList();
                }
            } catch (err) {
                toast.error(
                    "Не смогли удалить! Если повториться - обратитесь к разрабу."
                );
            }
        }
    }

    function changeInputs({ target }) {
        setInputs((prev) => ({ ...prev, [target.id]: target.value }));
    }
    function saveUserInfo() {
        if (inputs.username !== user.username || inputs.password.length > 3) {
            // alert("save");
            protectedRequest
                .put("/user/change/" + user._id, { ...inputs })
                .then(({ data }) => {
                    // console.log(data);
                    if (data?.status) {
                        toast.success("Сохраненно! Перезайдите пожалуйста");
                        logoutUser(dispatch);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log("no");
        }
    }

    function fetchUserList() {
        protectedRequest
            .get("/user/")
            .then(({ data }) => {
                // console.log(data);
                setUserList(data.filter((usr) => user._id !== usr._id));
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
