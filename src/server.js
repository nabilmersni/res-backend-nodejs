const app = require('./app');
const mongoose = require('mongoose');

const dbHost =
  'mongodb+srv://nabil:zvynntest@cluster0.1y7pv.mongodb.net/zvynn?retryWrites=true&w=majority';

mongoose
  .connect(dbHost, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the DB 👌');
  });

const port = 3000;
app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
