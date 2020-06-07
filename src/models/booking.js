
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create booking Schema & model
const BookingSchema = new Schema({
    Start_date: {
        type: String
    },
    End_date: {
        type: String
    },
    Service_Id: {
        type: String
    },
    Book_status_Id: {
        type: String
    }
});

const Booking = mongoose.model('booking', BookingSchema);

module.exports = Booking;
