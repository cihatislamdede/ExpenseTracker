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
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var categoryActions_1 = require("../actions/categoryActions");
var recordActions_1 = require("../actions/recordActions");
var emptyForm = {
    title: "",
    amount: 0,
    category_id: 0
};
function Records() {
    var _a = react_redux_1.useSelector(function (state) { return state.records; }), data = _a.data, loading = _a.loading, error = _a.error;
    var categories = react_redux_1.useSelector(function (state) { return state.categories; }).data;
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
            dispatch(recordActions_1.addRecord(form));
        else if (mode === "edit" && typeof updateID === 'number')
            dispatch(recordActions_1.updateRecord(form, updateID));
        else if (mode === "delete" && typeof deleteID === 'number')
            dispatch(recordActions_1.deleteRecord(deleteID));
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
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: function (amount, record) {
                return react_1["default"].createElement(react_1["default"].Fragment, null, Intl.NumberFormat('tr-TR', { style: "currency", currency: "TRY" }).format(amount));
            }
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: function (category, record) {
                return react_1["default"].createElement(antd_1.Tag, { color: category.color }, category.name.toUpperCase());
            }
        },
        {
            title: "Last Update",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: function (updatedAt, record) {
                var updatedAtObj = new Date(updatedAt);
                return react_1["default"].createElement(react_1["default"].Fragment, null, updatedAtObj.toLocaleDateString() + " - " + updatedAtObj.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }));
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: function (text, record) {
                var title = record.title, amount = record.amount;
                var category_id = record.category.id;
                return (react_1["default"].createElement(antd_1.Space, { size: "middle" },
                    react_1["default"].createElement(icons_1.EditFilled, { style: { color: "#0380fc" }, onClick: function () {
                            showModal("edit");
                            setForm({ title: title, amount: amount, category_id: category_id });
                            setUpdateID(record.id);
                        } }),
                    react_1["default"].createElement(icons_1.DeleteFilled, { style: { color: "darkred" }, onClick: function () {
                            showModal("delete");
                            setDeleteID(record.id);
                        } })));
            }
        },
    ];
    var dispatch = react_redux_1.useDispatch();
    react_1.useEffect(function () {
        dispatch(recordActions_1.getRecords());
        !categories.length && dispatch(categoryActions_1.getCategories());
    }, []);
    var isFormValid = !(!form.title || form.amount === 0 || form.category_id === 0);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginBottom: 20 } },
                react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: function () { return showModal("new"); } }, "New Record")),
            react_1["default"].createElement(antd_1.Modal, { title: mode === "new" ? "Create New Record" : mode === "edit" ? "Update Record" : "Delete Record", okButtonProps: { disabled: !(mode === "delete") && !isFormValid }, visible: isModalVisible, onOk: handleOk, onCancel: handleCancel }, mode === "new" || mode === "edit" ?
                react_1["default"].createElement(antd_1.Form, { labelCol: { span: 8 }, wrapperCol: { span: 16 } },
                    react_1["default"].createElement(antd_1.Form.Item, { label: "Title", required: true },
                        react_1["default"].createElement(antd_1.Input, { name: "title", value: form.title, onChange: function (e) { return setForm(__assign(__assign({}, form), { title: e.target.value })); } })),
                    react_1["default"].createElement(antd_1.Form.Item, { label: "Amount", required: true },
                        react_1["default"].createElement(antd_1.Input, { name: "amount", type: "number", value: form.amount, onChange: function (e) { return setForm(__assign(__assign({}, form), { amount: Number(e.target.value) })); } })),
                    react_1["default"].createElement(antd_1.Form.Item, { label: "Category" },
                        react_1["default"].createElement(antd_1.Select, { defaultValue: form.category_id, value: form.category_id, onChange: function (category_id) { return setForm(__assign(__assign({}, form), { category_id: category_id })); } },
                            react_1["default"].createElement(antd_1.Select.Option, { value: 0, disabled: true }, "Select a category"),
                            categories.map(function (category) {
                                return (react_1["default"].createElement(antd_1.Select.Option, { value: category.id, key: category.id }, category.name));
                            }))))
                : mode === "delete" ? react_1["default"].createElement(react_1["default"].Fragment, null, "Are you sure?") : null)),
        react_1["default"].createElement(antd_1.Table, { loading: loading, columns: columns, dataSource: data, rowKey: "id" })));
}
exports["default"] = Records;
