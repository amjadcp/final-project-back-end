const { login } = require("../controllers/auth/login");
const { RoleEnum } = require("../utils/enum");

const router = require("express").Router();


router.post("/login-admin", login(RoleEnum.ADMIN))

module.exports = router