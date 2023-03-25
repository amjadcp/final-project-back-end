const router = require("express").Router();
const authController = require('../controllers/admin/auth');
const profileController = require('../controllers/student/profile')

router.route('/profile/:id').get(authController.protect,profileController.getProfile);
router.route('/profile/:id').put(authController.protect,profileController.editProfile);

module.exports = router;