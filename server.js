const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const keys = require('./src/config/keys');
const userRoutes = require('./src/server/controllers/user.controller.server');
const transactionRoutes = require('./src/server/controllers/transaction.controller.server');
const PORT = process.env.PORT || 5000;

// Start Express
const app = express();
// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));
// app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(
  session({
    name: keys.SESS_NAME,
    secret: keys.SESS_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      path: '/',
      maxAge: 1000 * 60 * 24
    }
  })
);
app.use('/api/user', userRoutes);
app.use('/api/transaction', transactionRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// const httpServer = app.listen(PORT, function() {
//   console.log('Connected to server');
// });
app.listen(PORT, function() {
  console.log('Connected to server');
});
// Database connection
mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true });
mongoose.connection.on('connected', function(){
  console.log(connected("Database connection successfull"));
});
mongoose.connection.on('error', function(err){
  console.log(err);
});
// app.httpserver = httpServer;
module.exports = app;