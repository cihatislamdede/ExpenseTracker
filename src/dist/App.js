"use strict";
exports.__esModule = true;
var react_router_1 = require("react-router");
var SignUp_1 = require("./components/SignUp");
var antd_1 = require("antd");
var Login_1 = require("./components/Login");
var Categories_1 = require("./components/Categories");
var PrivateRoute_1 = require("./components/PrivateRoute");
var Records_1 = require("./components/Records");
var HeaderComp_1 = require("./components/HeaderComp");
var Logout_1 = require("./components/Logout");
var react_1 = require("react");
var Content = antd_1.Layout.Content, Footer = antd_1.Layout.Footer;
function App() {
    return (react_1["default"].createElement(antd_1.Layout, null,
        react_1["default"].createElement(HeaderComp_1["default"], null),
        react_1["default"].createElement(Content, { className: "site-layout", style: { padding: '50px', marginTop: 64 } },
            react_1["default"].createElement(react_router_1.Route, { path: "/signup", component: SignUp_1["default"] }),
            react_1["default"].createElement(react_router_1.Route, { path: "/login", component: Login_1["default"] }),
            react_1["default"].createElement(react_router_1.Route, { path: "/logout", component: Logout_1["default"] }),
            react_1["default"].createElement(PrivateRoute_1["default"], { path: "/categories", component: Categories_1["default"] }),
            react_1["default"].createElement(PrivateRoute_1["default"], { path: "/records", component: Records_1["default"] })),
        react_1["default"].createElement(Footer, { style: { textAlign: 'center' } }, "Expense Tracker")));
}
exports["default"] = App;
