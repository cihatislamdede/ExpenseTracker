"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_router_1 = require("react-router");
var userActions_1 = require("../actions/userActions");
var showError_1 = require("../utils/showError");
var showSuccess_1 = require("../utils/showSuccess");
function Login() {
    var _a;
    var history = react_router_1.useHistory();
    var location = react_router_1.useLocation();
    console.log(location);
    var dispatch = react_redux_1.useDispatch();
    var _b = react_redux_1.useSelector(function (state) { return state.user; }), data = _b.data, loading = _b.loading, error = _b.error;
    var onFinish = function (values) {
        dispatch(userActions_1.login(values));
    };
    react_1.useEffect(function () {
        error && showError_1["default"](error);
    }, [error]);
    react_1.useEffect(function () {
        data.username && showSuccess_1["default"]("You have successfully logged in!");
    }, [data.username]);
    react_1.useEffect(function () {
        var token = localStorage.getItem("token");
        if (token) {
            history.push("/");
        }
    }, [data]);
    return (React.createElement(antd_1.Form, { name: "basic", labelCol: { span: 8 }, wrapperCol: { span: 16 }, onFinish: onFinish },
        React.createElement("h1", { style: { textAlign: "center", marginBottom: 20 } }, "Login"),
        ((_a = location.state) === null || _a === void 0 ? void 0 : _a.newSignUp) && (React.createElement(antd_1.Result, { status: "success", title: "You successfully signed up!", subTitle: "Please login using your credentials." })),
        React.createElement(antd_1.Form.Item, { label: "Username", name: "username", rules: [{ required: true, message: 'Please input your username!' }] },
            React.createElement(antd_1.Input, null)),
        React.createElement(antd_1.Form.Item, { label: "Password", name: "password", rules: [{ required: true, message: 'Please input your password!' }] },
            React.createElement(antd_1.Input.Password, null)),
        React.createElement(antd_1.Form.Item, { wrapperCol: { offset: 8, span: 16 } },
            React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Submit"))));
}
exports["default"] = Login;
