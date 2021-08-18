"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var defaultState = {
    data: {},
    loading: false,
    error: ""
};
var userReducer = function (state, action) {
    if (state === void 0) { state = defaultState; }
    switch (action.type) {
        case "LOGIN_START":
        case "ISLOGGED_IN_START":
            return __assign(__assign({}, state), { loading: true, error: "" });
        case "LOGIN_SUCCESS":
        case "ISLOGGED_IN_SUCCESS":
            return __assign(__assign({}, state), { loading: false, data: action.payload });
        case "LOGIN_ERROR":
            return __assign(__assign({}, state), { loading: false, error: "Login failed." });
        // case "ISLOGGED_IN_ERROR":
        //     return { ...state, loading: false, error: "Token missing or invalid." };
        case "LOGOUT":
            return __assign(__assign({}, state), { data: {} });
        default:
            return state;
    }
};
exports["default"] = userReducer;
