"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var categoryReducer_1 = require("./reducers/categoryReducer");
var recordReducer_1 = require("./reducers/recordReducer");
var userReducer_1 = require("./reducers/userReducer");
;
var rootReducer = redux_1.combineReducers({
    user: userReducer_1["default"],
    categories: categoryReducer_1["default"],
    records: recordReducer_1["default"]
});
exports["default"] = rootReducer;
