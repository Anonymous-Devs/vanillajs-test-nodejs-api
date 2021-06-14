const api = require("express").Router();
const test = require("./handler");

// test.getTest({ data: 090 }, { });
api.get("/test", test.getTest);

module.exports = api;