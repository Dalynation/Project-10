'use strict';

// load modules
var express = require('express');
var morgan = require('morgan');
var jsonParser = require("body-parser").json;
var routes = require("./routes");
var mongoose = require("mongoose");
var app = express();
var cors = reqiure("cors"); //

app.use(cors()); //



// my express app will be utilizing the JsonParser
app.use(jsonParser());

// the root directory uses the routes js file
app.use("/", routes);

mongoose.connect("mongodb://localhost:27017/fsjstd-restapi", { useNewUrlParser: true });

var db = mongoose.connection;

db.on("error", function(err){
    console.error("connection error:", err);
});

db.once("open", function(){
    console.log("db connection successful");
    // All database commucation goes here
});

//------------------------------------------------
// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';


// setup morgan which gives us http request logging
app.use(morgan('dev'));


// TODO setup your api routes here

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
    stack: err.stack
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
