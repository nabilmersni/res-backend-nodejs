const express = require('express');
const serviceController = require('./../controllers/serviceControllers');
const authController = require('./../controllers/authControllers');

const router = express.Router();

router
  .route('/')
  .get(serviceController.getAllServices)
  .post(
    authController.protect,
    authController.restrectedTo('prestataire'),
    serviceController.createService
  );

router.route('/:id').patch(serviceController.updateService);

module.exports = router;
