var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

// DB STUFF
const Place = require('./models/Place');
const db = require('./config/database');
db.connect();

// Routes
var indexRouter = require('./routes/index');
var places = require('./routes/places'); 


var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// App Routes - URLs
app.use('/', indexRouter);
app.use('/places', places);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log('err.message');
  console.log(err.message);

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
