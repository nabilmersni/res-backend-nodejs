
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create booking Schema & model
const BookingSchema = new Schema({
    
    day: [],
    time: {hour:String, minute:String,second:String},
    Service_Id: {
        type: String
    },
    Book_status_Id: {
        type: String,
        default: "waiting"
    },
    Client_Id: {
        type: String
    }

});

const Booking = mongoose.model('booking', BookingSchema);

module.exports = Booking;
