const express = require("express");
const route = express.Router();
const { login, register, getAllUsers , deleteUserById ,getUserById } = require("../Controllers/UserController");

route.route("/login").post(login);
route.route("/register").post(register);
route.route("/")
    .get(getAllUsers);
route.route("/delete/:id")
    .delete(deleteUserById);
route.route("/:id")
    .get(getUserById);

module.exports = route;