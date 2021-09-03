const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'booking must have a user'],
  },
  serviceId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Service',
    required: [true, 'booking must have a service'],
  },

  date: {
    type: Date,
    required: [true, 'booking must have a date'],
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
