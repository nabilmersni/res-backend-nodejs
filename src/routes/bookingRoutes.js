const express = require('express');
const bookingControllers = require('../controllers/bookingControllers');
const authController = require('./../controllers/authControllers');

const router = express.Router();

router.post(
  '/:serviceId',
  authController.protect,
  bookingControllers.createBooking
);

router.get('/', authController.protect, bookingControllers.getAllBooking);

module.exports = router;
