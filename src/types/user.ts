import { type } from "os";
import { ThunkDispatch } from "redux-thunk";

export interface User {
    message: string;
    username: string;
    email: string;
    full_name: string;
    token: string;
}

export interface LoginForm {
    username : string;
    password : string;
}

export interface UserState{
    data : User;
    loading : boolean;
    error : string;
}

interface LOGIN_START{
    type:"LOGIN_START";
}
interface LOGIN_SUCCESS{
    type: "LOGIN_SUCCESS";
    payload : User;
}

interface LOGIN_ERROR{
    type : "LOGIN_ERROR";
}

interface ISLOGGED_IN_START{
    type:"ISLOGGED_IN_START";
}
interface ISLOGGED_IN_SUCCESS{
    type: "ISLOGGED_IN_SUCCESS";
    payload : User;
}

interface ISLOGGED_IN_ERROR{
    type : "ISLOGGED_IN_ERROR";
}

interface LOGOUT {
    type : "LOGOUT"
}

export type UserAction = LOGIN_START | LOGIN_SUCCESS | LOGIN_ERROR | ISLOGGED_IN_START | ISLOGGED_IN_SUCCESS | ISLOGGED_IN_ERROR | LOGOUT;
export type UserDispatch = ThunkDispatch<UserState,void,UserAction>;