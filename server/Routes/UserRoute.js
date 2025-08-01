const express = require("express");
const route = express.Router();
const { login,getMe, register, getAllUsers , deleteUserById  } = require("../Controllers/UserController");
const { verifyToken } = require("../Middelwares/verifyToken")

route.route("/login").post(login);
route.route("/register").post(register);
route.route("/")
    .get(getAllUsers);
route.route("/delete/:id")
    .delete(deleteUserById);

route.route("/me")
    .get(verifyToken, getMe);
module.exports = route;