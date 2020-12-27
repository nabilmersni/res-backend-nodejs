const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://testinguser:azerty147258369@cluster0.hsewk.gcp.mongodb.net/res-app?retryWrites=true&w=majority"

mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})

module.exports = mongoose;