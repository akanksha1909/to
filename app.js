var createError = require('http-errors');
var express = require('express');
var mongoose    = require( "mongoose" ); //Database layer for mongodb
var path = require('path');
var cors        = require( "cors" );
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const requestIp = require('request-ip');


const bodyParser = require("body-parser");

//Enable query logger for development
mongoose.set('debug', true);


  

var app = express();


app.use(cors());
app.use(requestIp.mw());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes starts here
const user = require( "./routes/userRouter.js" );
app.use( "/user", user );

const reminder = require( "./routes/reminderRouter.js" );
app.use( "/reminder", reminder );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen( process.env.PORT || 5000, function(){

   console.log( "Server is running on Port "+ ( process.env.PORT || 5000 ) );
});
module.exports = app;
