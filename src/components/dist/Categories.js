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
var antd_1 = require("antd");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var categoryActions_1 = require("../actions/categoryActions");
var react_color_1 = require("react-color");
var icons_1 = require("@ant-design/icons");
var categoryActions_2 = require("../actions/categoryActions");
var emptyForm = {
    name: "",
    type: "expense",
    color: "black"
};
function Categories() {
    var _a = react_redux_1.useSelector(function (state) { return state.categories; }), data = _a.data, loading = _a.loading, error = _a.error;
    var _b = react_1.useState(false), isModalVisible = _b[0], setIsModalVisible = _b[1];
    var _c = react_1.useState("new"), mode = _c[0], setMode = _c[1];
    var _d = react_1.useState(emptyForm), form = _d[0], setForm = _d[1];
    var _e = react_1.useState(null), updateID = _e[0], setUpdateID = _e[1];
    var _f = react_1.useState(null), deleteID = _f[0], setDeleteID = _f[1];
    var showModal = function (mode) {
        setIsModalVisible(true);
        setMode(mode);
    };
    var handleOk = function () {
        if (mode === "new")
            dispatch(categoryActions_1.addCategory(form));
        else if (mode === "edit" && typeof updateID === 'number')
            dispatch(categoryActions_2.updateCategory(form, updateID));
        else if (mode === "delete" && typeof deleteID === 'number')
            dispatch(categoryActions_2.deleteCategory(deleteID));
        setIsModalVisible(false);
        setMode("new");
        setForm(emptyForm);
        setUpdateID(null);
        setDeleteID(null);
    };
    var handleCancel = function () {
        setIsModalVisible(false);
        setMode("new");
        setForm(emptyForm);
        setUpdateID(null);
        setDeleteID(null);
    };
    var columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: function (text, category) {
                return react_1["default"].createElement(antd_1.Tag, { color: category.color }, text.toUpperCase());
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: function (text, category) { return (react_1["default"].createElement(antd_1.Space, { size: "middle" },
                react_1["default"].createElement(icons_1.EditFilled, { style: { color: "#0380fc" }, onClick: function () {
                        showModal("edit");
                        setForm(category);
                        setUpdateID(category.id);
                    } }),
                react_1["default"].createElement(icons_1.DeleteFilled, { style: { color: "darkred" }, onClick: function () {
                        showModal("delete");
                        setDeleteID(category.id);
                    } }))); }
        },
    ];
    var dispatch = react_redux_1.useDispatch();
    react_1.useEffect(function () {
        dispatch(categoryActions_1.getCategories());
    }, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginBottom: 20 } },
                react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: function () { return showModal("new"); } }, "New Category")),
            react_1["default"].createElement(antd_1.Modal, { title: mode === "new" ? "Create New Category" : mode === "edit" ? "Update Category" : "Delete Category", okButtonProps: { disabled: !(mode === "delete") && !form.name }, visible: isModalVisible, onOk: handleOk, onCancel: handleCancel }, mode === "new" || mode === "edit" ?
                react_1["default"].createElement(antd_1.Form, { labelCol: { span: 8 }, wrapperCol: { span: 16 } },
                    react_1["default"].createElement(antd_1.Form.Item, { label: "Category Name", required: true },
                        react_1["default"].createElement(antd_1.Input, { name: "name", value: form.name, onChange: function (e) { return setForm(__assign(__assign({}, form), { name: e.target.value })); } })),
                    react_1["default"].createElement(antd_1.Form.Item, { label: "Category Type" },
                        react_1["default"].createElement(antd_1.Select, { defaultValue: "expense", value: form.type, onChange: function (type) { return setForm(__assign(__assign({}, form), { type: type })); } },
                            react_1["default"].createElement(antd_1.Select.Option, { value: "income" }, "Income"),
                            react_1["default"].createElement(antd_1.Select.Option, { value: "expense" }, "Expense"))),
                    react_1["default"].createElement(antd_1.Form.Item, { label: "Color" },
                        react_1["default"].createElement(react_color_1.GithubPicker, { color: form.color, colors: ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6'], onChange: function (color) { return setForm(__assign(__assign({}, form), { color: color.hex })); } })))
                : mode === "delete" ? react_1["default"].createElement(react_1["default"].Fragment, null, "Are you sure?") : null)),
        react_1["default"].createElement(antd_1.Table, { loading: loading, columns: columns, dataSource: data, rowKey: "id" })));
}
exports["default"] = Categories;
