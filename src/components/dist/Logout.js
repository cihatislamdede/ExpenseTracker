"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_router_1 = require("react-router");
var userActions_1 = require("../actions/userActions");
function Logout() {
    var data = react_redux_1.useSelector(function (state) { return state.user; }).data;
    var dispatch = react_redux_1.useDispatch();
    react_1.useEffect(function () {
        dispatch(userActions_1.logOut());
    }, []);
    if (!data.username)
        return react_1["default"].createElement(react_router_1.Redirect, { to: "/login" });
    return react_1["default"].createElement("div", null, "Logging out...");
}
exports["default"] = Logout;
