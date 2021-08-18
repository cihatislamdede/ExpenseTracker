"use strict";
exports.__esModule = true;
var react_1 = require("react");
function Header() {
    return (react_1["default"].createElement(Header, { style: { position: 'fixed', zIndex: 1, width: '100%' } },
        react_1["default"].createElement("div", { className: "logo" }),
        react_1["default"].createElement(Menu, { theme: "dark", mode: "horizontal", defaultSelectedKeys: ['1'] },
            react_1["default"].createElement(Menu.Item, { key: "1" },
                react_1["default"].createElement(Link, { to: "/" },
                    react_1["default"].createElement("span", null, "Home"))),
            react_1["default"].createElement(Menu.Item, { key: "2" },
                react_1["default"].createElement(Link, { to: "/login" },
                    react_1["default"].createElement("span", null, "Login"))),
            react_1["default"].createElement(Menu.Item, { key: "3" },
                react_1["default"].createElement(Link, { to: "/signup" },
                    react_1["default"].createElement("span", null, "Sign Up"))))));
}
exports["default"] = Header;
