const cors = require("cors");
const app = require("express")();
app.use(cors());
const api = require("express").Router();
// const api = app();
const user = require("./handler");

api.post('/user/create-account', user.createOne)
api.post('/user/sign-in', user.login)
api.get('/user/getOne', user.getOne)
module.exports = api;