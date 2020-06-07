const express = require('express');
const Booking = require('../models/booking');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/bookings', function (req, res, next) {
  Booking.find({}).then(function (bookings) {
    res.send(bookings);
  });
});

router.get('/bookings/byuser', function (req, res, next) {
  Booking.aggregate().then(function (bookings) {
    res.send(bookings);
  });

})


router.get("/bookings/:id", (req, res, next) => {
  console.log('get by id');

  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Booking.findOne({ _id: req.params.id }).then(function (booking) {

      if (booking) {
        //res.resolve({success:true,data:doc});
        console.log('succes');
        res.send(booking);
      } else {
        res.send(404);
        console.log('no data exist for this id');
      }
    });
  }
  else {
    console.log('Please provide correct id');
    res.send(404);
    //res.sendStatus(status);
  }
});

router.post('/bookings', function (req, res, next) {
  Booking.create(req.body).then(function (booking) {
    res.send(booking);
  }).catch(next);
});

router.put('/bookings/:id', function (req, res, next) {
  Booking.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
    Booking.findOne({ _id: req.params.id }).then(function (booking) {
      res.send(booking);
    });
  }).catch(next);
});

router.delete('/bookings/:id', function (req, res, next) {
  Booking.findByIdAndRemove({ _id: req.params.id }).then(function (booking) {
    res.send(booking);
  }).catch(next);
});

module.exports = router;
