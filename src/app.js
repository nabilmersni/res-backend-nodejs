const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require("./db/connection")

const adminController = require('./controllers/adminController');
const prestataireController = require('./controllers/prestataireController');
const userController = require('./controllers/userController')
const serviceController = require('./controllers/serviceController');
const categorieController = require('./controllers/categorieController')
const bookingController=  require('./controllers/bookingController');


const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(cors());

app.use("/admin", adminController);
app.use("/prestataire", prestataireController);
app.use("/user", userController);
app.use("/service", serviceController);
app.use("/categorie", categorieController);
app.use("/booking", bookingController);


app.get('/', (req, res) => {
    res.status(200).send("Welcome To The Server !");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

app.use( express.static("uploads/servicephoto"));
app.use( express.static("uploads/userPhoto"));
