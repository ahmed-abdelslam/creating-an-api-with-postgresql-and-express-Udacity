"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var ENV = process.env.ENV;
var POSTGRES_HOST = process.env.POSTGRES_HOST;
var POSTGRES_DB;
if (ENV === 'test')
    POSTGRES_DB = process.env.POSTGRES_TEST_DB;
else
    POSTGRES_DB = process.env.POSTGRES_DB;
var POSTGRES_USER = process.env.POSTGRES_USER;
var POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
var client = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});
exports["default"] = client;
