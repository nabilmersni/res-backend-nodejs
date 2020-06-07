const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create bookedSU Schema & model
const bookedSUSchema = new Schema({
    Booking_Id: {
        type: String
    },
    Client_Id: {
        type: String
    }
});

const BookedSU = mongoose.model('bookedSU', bookedSUSchema);

module.exports = BookedSU;
