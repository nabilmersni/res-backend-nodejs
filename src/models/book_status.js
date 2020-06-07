const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create book_status Schema & model
const Book_statusSchema = new Schema({
    Name: {
        type: String
    }
});

const Book_status = mongoose.model('book_status', Book_statusSchema);

module.exports = Book_status;

