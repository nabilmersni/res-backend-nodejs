const express = require('express');
const userController = require('./../controllers/userControllers');
const authController = require('./../controllers/authControllers');

const router = express.Router();

router.post('/login', authController.login);

router.patch('/resetPassword/:id', authController.protect, userController.resetPassword);

router.route('/').get(authController.protect, userController.getAllUser).post(userController.signUp);

router
  .route('/:id')
  .get(authController.protect, userController.getOneUser)
  .patch(authController.protect, userController.uploadUserImg, userController.resizeUserImg, userController.updateUser);

module.exports = router;
