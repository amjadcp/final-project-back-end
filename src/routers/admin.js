const router = require("express").Router();
const authController = require('../controllers/admin/auth');
const achievementController = require('../controllers/admin/achievement');
const studentController = require('../controllers/admin/student');

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);

router.route('/achievement').post(authController.protect,achievementController.addAchievement);
router.route('/achievement').get(authController.protect,achievementController.getAllAchievements);
router.route('/achievement/:id').delete(authController.protect,achievementController.deleteAchievement);

router.route('/student').post(authController.protect,studentController.addStudent);
router.route('/student').get(authController.protect,studentController.getAllStudents);
router.route('/student/:id').get(authController.protect,studentController.getOneStudent);
router.route('/student/:id').delete(authController.protect,studentController.deleteStudent);

module.exports = router;