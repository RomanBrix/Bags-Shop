import { useState } from "react";
// import axios from "axios";
// import { publicRequest } from "../../requestMethods";
import { adminLogin } from "../../Redux/userControl";
import { useDispatch } from "react-redux";
import { ReactComponent as BgGrid } from "./svg/bgGrid.svg";

export default function Enter() {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    // useEffect(() => {
    //     if (user) {
    //         //redirect
    //     }
    // }, [user]);
    // console.log(BgGrid);
    const dispatch = useDispatch();
    return (
        <div className="admin admin-enter">
            <div className="bg">
                <BgGrid />
            </div>
            <div className="center">
                <div className="enter-form">
                    <input
                        type="text"
                        placeholder="username"
                        id="username"
                        value={inputs.username}
                        onChange={handleChange}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                login();
                            }
                        }}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        id="password"
                        value={inputs.password}
                        onChange={handleChange}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                login();
                            }
                        }}
                    />
                    <button className="btn" onClick={login}>
                        Ввойти
                    </button>
                    {/* <button className="btn" onClick={initAdmin}>
                        Init
                    </button> */}
                </div>
            </div>
        </div>
    );

    async function login() {
        // publicRequest.post('/auth/login', { ...inputs })
        await adminLogin(dispatch, inputs.username, inputs.password);
    }

    // function initAdmin() {
    //     // axios
    //     publicRequest.post("/auth/init", { ...inputs }).then((res) => {
    //         console.log(res);
    //     });
    // }
    function handleChange({ target }) {
        setInputs((prev) => ({
            ...prev,
            [target.id]: target.value,
        }));
    }
}
