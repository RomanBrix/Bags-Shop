import { useState } from "react";

export default function Settings({ user }) {
    const [inputs, setInputs] = useState({
        username: user.username,
        password: "",
    });

    return (
        <div className="admin">
            <div className="center">
                <h1>Settings</h1>
                <div className="block">
                    <h2>Change Username Password</h2>
                    <div className="form">
                        <input
                            type="text"
                            id="username"
                            value={inputs.username}
                            onChange={changeInputs}
                        />
                        <input
                            type="text"
                            id="password"
                            value={inputs.password}
                            onChange={changeInputs}
                        />
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
                    <h2>All users</h2>
                    <button className="btn">Добавить пользователя</button>
                    <p>users list with delete func</p>
                </div>
            </div>
        </div>
    );

    function changeInputs({ target }) {
        setInputs((prev) => ({ ...prev, [target.id]: target.value }));
    }
    function saveUserInfo() {
        if (inputs.username !== user.username || inputs.password.length > 3) {
            alert("save");
        }
    }
}
