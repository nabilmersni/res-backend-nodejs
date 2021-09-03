const express = require('express');
const User = require('./../models/userModel');
const Service = require('./../models/serviceModel');
const Booking = require('./../models/bookingModel');

exports.createBooking = async (req, res) => {
  try {
    req.body.userId = req.user._id;
    req.body.serviceId = req.params.serviceId;
    const date = req.body.date + 'T' + req.body.time;
    req.body.date = date;

    const booking = await Booking.create(req.body);

    res.status(200).json({
      status: 'success',
      booking,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId serviceId');

    res.status(200).json({
      status: 'success',
      result: bookings.length,
      data: {
        bookings,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
