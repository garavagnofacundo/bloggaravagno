const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

//confing vars
const port = 3000; //puerto al que se conecta
const db = process.env.MONGODB_URI || 'mongodb://localhost/blog35'; // como se conecta a la base de datos

//db connection
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log(`DB connected @ ${db}`);
  })
  .catch(err => console.error(`connection error ${err}`));
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
//app.use('/', router);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

//listen
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
