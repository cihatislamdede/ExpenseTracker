"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var categoryActions_1 = require("../actions/dist/categoryActions");
function Category() {
    var _a = react_redux_1.useSelector(function (state) { return state.categories; }), data = _a.data, loading = _a.loading, error = _a.error;
    console.log({ data: data, loading: loading, error: error });
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
                return React.createElement(antd_1.Tag, { color: category.color }, text.toUpperCase());
            }
        },
    ];
    var dispatch = react_redux_1.useDispatch();
    react_1.useEffect(function () {
        dispatch(categoryActions_1.getCategories());
    }, []);
    return (React.createElement(antd_1.Table, { columns: columns, dataSource: data }));
}
exports["default"] = Category;
