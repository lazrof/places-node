var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

// DB STUFF
const Place = require('./models/Place');
const db = require('./config/database');
db.connect();

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));




// TEMPORAL ROUTES
app.use('/', indexRouter);

app.post('/places', (req, res) => {
  Place.create({
    title:'Sella HQ',
    description: 'Dorime ameno',
    acceptsCreditCard: false,
    openHour: 0,
    closeHour: 24
  }).then(doc => {
    res.json(doc);
  }).catch(err => {
    console.log(err);
    res.json(err);
  });
});






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
