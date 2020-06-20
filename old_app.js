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
    title:'Sella HQ 2',
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


app.get('/places', (req, res) => {

  Place.find({})
    .then(docs => {
      res.json(docs);
    }).catch(err => {
      console.log(err);
      res.json(err);
    });

});

app.get('/places/:id', (req, res) => {
  //Place.findOne
  Place.findById(req.params.id)
    .then(doc => {
      res.json(doc);
    }).catch(err =>{
      console.log(err);
      res.json(err);
    });
})

app.put('/places/:id', (req, res) => {

  // Este .findById ejecuta puede ejecutar hooks
  // Place.findById(req.params.id)
  // .then(doc => {
  //   doc.title = req.body.title;
  //   doc.description = req.body.title;
  //   doc.save()
  // })

  // .update recibe 2 parametros 
  // el primero es el parametro por el cual va a buscar el documento
  // el segundo, son los campos que se quieren actualizar del documento
  // ademas .update actualiza todo lo que consiga en su query
  let attributes = ['title', 'description', 'acceptsCreditCard', 'openHour', 'closeHour']
  let placeParams = {}
  
  // recorremos el array de attributes para detectar que valores estan llegando en el req
  // asi guardamos realmente los fields que se hayan editado
  attributes.forEach(attr => {
    if(Object.prototype.hasOwnProperty.call(req.body, attr)){
      placeParams[attr] = req.body[attr];
    }
  });
  
  /* update devuelve una respuesta generica de que campos fueron editados, no es muy elegante realmente
  Place.update({'_id': req.params.id}, {
    title:'Sella HQ 2',
    description: 'Dorime ameno',
    acceptsCreditCard: false,
    openHour: 0,
    closeHour: 24
  })*/
  //pudimos usar .findOneAndUpdate tambien
  Place.findByIdAndUpdate({'_id': req.params.id}, placeParams, {new:true})
  .then(doc => {
    res.json(doc);
  }).catch(err => {
    console.log();
    res.json(err);
  });
})

app.delete('/places/:id', (req, res) => {
  Place.findByIdAndRemove(req.params.id)
    .then(doc => {
      res.json({});
    }).catch(err => {
      console.log();
      res.json(err);
    });
})

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
