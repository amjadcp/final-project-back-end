const { addTeam } = require("../controllers/team/team");
const { auth } = require("../middleware/auth");
const { RoleEnum } = require("../utils/enum");

const router = require("express").Router();


router.post("/add-admin", auth(RoleEnum.ADMIN), addTeam(RoleEnum.ADMIN))
router.post("/add-student", auth(RoleEnum.ADMIN), addTeam(RoleEnum.STUDENT))
router.post("/add-alumini", auth(RoleEnum.ADMIN), addTeam(RoleEnum.ALUMINI))

module.exports = router