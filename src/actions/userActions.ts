import { User, UserDispatch } from "../types/user";
import api from "../utils/api";

export const login = (creds: any) => async (dispatch: UserDispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const response = await api().post<User>("/users/login", creds);
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
        localStorage.setItem("token",response.data.token);
    } catch (error) {
        dispatch({type:"LOGIN_ERROR"});
    }

}


export const isLoggedIn = () => async (dispatch : UserDispatch) => {
    dispatch({ type: "ISLOGGED_IN_START" });
    try {
        const response = await api().post<User>("/users/is_logged_in");
        dispatch({ type: "ISLOGGED_IN_SUCCESS", payload: response.data });
        localStorage.setItem("token",response.data.token);
    } catch (error) {
        dispatch({type:"ISLOGGED_IN_ERROR"});
    }
}

export const logOut = () => (dispatch : UserDispatch) =>{
    localStorage.removeItem("token");
    dispatch({type:"LOGOUT"});
}

