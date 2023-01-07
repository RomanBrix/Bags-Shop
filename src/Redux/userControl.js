import { loginFailure, loginStart, loginSuccess, logut } from "./userRedux";
// import Cookie from "js-cookie";
import { changeToken, publicRequest } from "../requestMethods";
import { toast } from "react-toastify";

// async function login(dispatch, login, password) {
//     dispatch(loginStart());
//     try {
//       // const res = await axios.post("/auth/login", {login, password});
//       const res = await userRequest.post("/auth/login", {login, password});
//       console.log(res);
//     //   Cookie.set('login', 'ok',{ expires: 1 })
//       console.log(res.data)
//       changeToken(res.data.token, res.data.username)
//       dispatch(loginSuccess(res.data));
//     } catch (error) {
//       console.log(error.response.data);
//       dispatch(loginFailure());
//     }
//   }

async function logoutUser(dispatch) {
    changeToken();
    dispatch(logut());
}

async function adminLogin(dispatch, login, password) {
    dispatch(loginStart());
    try {
        // const res = await axios.post("/auth/login", {login, password});
        const res = await publicRequest
            .post("/auth/admin", {
                login,
                password,
            })
            .catch((err) => {
                console.log("err");
                toast.warning("Wrong username or password!");
                return;
            });
        // console.log(res);
        //   Cookie.set('login', 'ok',{ expires: 1 })
        // console.log(res.data);

        if (res.data) {
            toast("C возвращением, " + res.data.username);
            changeToken(res.data.token, res.data.username);
            dispatch(loginSuccess(res.data));
        }
    } catch (error) {
        console.log(error);
        dispatch(loginFailure());
    }
}

export { adminLogin, logoutUser };
