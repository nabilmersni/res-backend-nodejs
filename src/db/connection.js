require('dotenv').config();

const mongoose = require('mongoose');

//const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://testinguser:azerty147258369@cluster0.hsewk.gcp.mongodb.net/res-app?retryWrites=true&w=majority"
const MONGODB_URI ="mongodb://localhost:27017/Zvyn";
//mongoose.connect("mongodb://localhost:27017/Zvyn",{useNewUrlParser :true});
mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Connected Database Successfully');
    });

module.exports = mongoose;