
const router = require('express').Router()

router.use("/auth",require("./auth"));
router.use("/team",require("./team"));
router.use("/admin",require("./admin"));


module.exports = router