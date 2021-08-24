const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const serviceRouter = require('./routes/serviceRoutes');

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/service', serviceRouter);

module.exports = app;
