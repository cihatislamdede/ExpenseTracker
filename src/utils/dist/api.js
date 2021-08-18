"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
exports["default"] = (function () {
    var token = localStorage.getItem("token");
    return axios_1["default"].create({
        baseURL: "https://expensetracker-be.herokuapp.com",
        headers: {
            Authorization: token
        }
    });
});
