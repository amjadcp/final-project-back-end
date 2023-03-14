const { adminLogin } = require("../controllers/auth/login");

const router = require("express").Router();


router.post("/login-admin", adminLogin)

module.exports = router