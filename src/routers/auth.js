const { login } = require("../controllers/auth/login");
const { UserEnum } = require("../utils/enum");

const router = require("express").Router();


router.post("/login-team", login(UserEnum.TEAM))
router.post("/login", login(UserEnum.STUDENT))

module.exports = router