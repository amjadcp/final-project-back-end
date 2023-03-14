
const router = require('express').Router()

router.use("/auth",require("./auth"));
router.use("/team",require("./team"));






module.exports = router