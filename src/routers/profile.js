const { getProfile, editProfile } = require("../controllers/profile/profile");
const { auth } = require("../middleware/auth");
const { UserEnum, StudentRoleEnum } = require("../utils/enum");

const router = require("express").Router();

router.get("/student", auth([StudentRoleEnum.STUDENT, StudentRoleEnum.ALUMINI]), getProfile(UserEnum.STUDENT))
router.put("/student", auth([StudentRoleEnum.STUDENT, StudentRoleEnum.ALUMINI]), editProfile(UserEnum.STUDENT))

module.exports = router