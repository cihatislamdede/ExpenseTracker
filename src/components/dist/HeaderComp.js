"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
var layout_1 = require("antd/lib/layout/layout");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var userActions_1 = require("../actions/userActions");
function HeaderComp() {
    var _a = react_redux_1.useSelector(function (state) { return state.user; }), data = _a.data, loading = _a.loading, error = _a.error;
    var dispatch = react_redux_1.useDispatch();
    react_1.useEffect(function () {
        dispatch(userActions_1.isLoggedIn());
    }, []);
    var pathname = react_router_dom_1.useLocation().pathname;
    return (react_1["default"].createElement(layout_1.Header, { style: { position: "fixed", zIndex: 1, width: "100%" } },
        react_1["default"].createElement("div", { className: "logo" }),
        react_1["default"].createElement(antd_1.Menu, { theme: "dark", mode: "horizontal", selectedKeys: [pathname] }, data.username ? (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(antd_1.Menu.Item, { key: "/records" },
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/records" }, "Records")),
            react_1["default"].createElement(antd_1.Menu.Item, { key: "/categories" },
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/categories" }, "Categories")),
            react_1["default"].createElement(antd_1.Menu.Item, { key: "/logout" },
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/logout" }, "Logout")))) :
            react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(antd_1.Menu.Item, { key: "/login" },
                    react_1["default"].createElement(react_router_dom_1.Link, { to: "login" }, "Login")),
                react_1["default"].createElement(antd_1.Menu.Item, { key: "/signup" },
                    react_1["default"].createElement(react_router_dom_1.Link, { to: "signup" }, "Sign Up"))))));
}
exports["default"] = HeaderComp;
