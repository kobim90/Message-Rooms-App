var express = require("express");
var router = express.Router();

const {verifySignUp, authJwt} = require("../middlewares");
const controller = require("../controllers/auth.controller")

router.post("/signup", verifySignUp.checkExistingUsernameOrEmail, controller.signup)

router.post("/signin", controller.signin)

router.get("/rooms", authJwt.checkToken, controller.getRooms)


module.exports = router;