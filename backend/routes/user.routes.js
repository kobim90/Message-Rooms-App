var express = require("express");
var router = express.Router();

const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller")

router.get("/", controller.getUser);

router.get("/users", controller.getUsers);

router.delete("/", controller.deleteUser);


module.exports = router;