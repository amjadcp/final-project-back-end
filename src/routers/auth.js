const { login } = require("../controllers/auth/login");
const { signup } = require("../controllers/auth/signup");
const { UserEnum } = require("../utils/enum");

const router = require("express").Router();


router.post("/login-team", login(UserEnum.TEAM))
router.post("/login", login(UserEnum.STUDENT))
router.post("/signup", signup)

module.exports = router