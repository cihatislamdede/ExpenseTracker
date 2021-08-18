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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var defaultState = {
    data: [],
    loading: false,
    error: ""
};
var categoryReducer = function (state, action) {
    if (state === void 0) { state = defaultState; }
    switch (action.type) {
        case "GET_CATEGORIES_START":
            return __assign(__assign({}, state), { loading: true, error: "" });
        case "GET_CATEGORIES_SUCCESS":
            return __assign(__assign({}, state), { loading: false, data: action.payload });
        case "GET_CATEGORIES_ERROR":
            return __assign(__assign({}, state), { loading: false, error: "Error fetching categories" });
        case "ADD_CATEGORY_START":
            return __assign(__assign({}, state), { loading: true, error: "" });
        case "ADD_CATEGORY_SUCCESS":
            return __assign(__assign({}, state), { loading: false, data: __spreadArrays([action.payload], state.data) });
        case "ADD_CATEGORY_ERROR":
            return __assign(__assign({}, state), { loading: false, error: "Error adding categories" });
        case "UPDATE_CATEGORY_START":
            return __assign(__assign({}, state), { loading: true, error: "" });
        case "UPDATE_CATEGORY_SUCCESS":
            return __assign(__assign({}, state), { loading: false, data: state.data.map(function (category) {
                    return category.id === action.payload.id ? action.payload : category;
                }) });
        case "UPDATE_CATEGORY_ERROR":
            return __assign(__assign({}, state), { loading: false, error: "Error updating category" });
        case "DELETE_CATEGORY_START":
            return __assign(__assign({}, state), { loading: true, error: "" });
        case "DELETE_CATEGORY_SUCCESS":
            return __assign(__assign({}, state), { loading: false, data: state.data.filter(function (category) { return category.id !== action.payload; }) });
        case "DELETE_CATEGORY_ERROR":
            return __assign(__assign({}, state), { loading: false, error: "Error deleting category" });
        default:
            return state;
    }
};
exports["default"] = categoryReducer;
