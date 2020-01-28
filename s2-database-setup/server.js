
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
//Setup s2: Import mongoose
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

var isProduction = process.env.NODE_ENV === 'production';

// Create global Express object
var app = express();

//allow cross origin requests 
app.use(cors());

//Setup s1: Use body-parser middleware so we can access req.body in our route handlers (see routes/v1/articles.js)
//Normal express config defaults
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Setup s1: Use the routes
app.use(require('./routes'));

//Setup s2: Connect the database
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});
mongoose.connection.on("open", function (ref) {
  console.log("✔ MongoDB connected");
});

/// Error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

// finally, let's start our server...
var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});