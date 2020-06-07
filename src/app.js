const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');


/*const serviceRouter = require('./routers/service')
const bookingRouter = require('./routers/booking')
const bookedSURouter = require('./routers/bookedSU')
const book_statusRouter = require('./routers/book_status')
*/
const userController = require('./controllers/userController')
const adminController = require('./controllers/adminController');

const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(cors());
app.use("/users", userController);
app.use("/admin", adminController);
/*app.use(serviceRouter)
app.use(bookingRouter)
app.use(bookedSURouter)
app.use(book_statusRouter)*/

app.get('/', (req, res) => {
    res.status(200).send("Welcome To The Server !");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})