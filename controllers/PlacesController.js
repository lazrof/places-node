const Place = require('../models/Place');

function index (req, res) {
	
	
	//.paginate recibe 2 args, primero el filtro y luego la data de la paginación
	// req.query lee los query strings de la URL
	// sort recibe un objeto con los fields por los cuales se quiere ordenar, -1 es de mayor a menor
	
	//Place.find({})
	Place.paginate({}, {page: req.query.page || 1, limit:8, sort: {'_id':-1}  })
	.then(docs => {
		res.json(docs);
	}).catch(err => {
		console.log(err);
		res.json(err);
	});
}

function show (req, res) {
	
	Place.findById(req.params.id)
		.then(doc => {
		res.json(doc);
		}).catch(err =>{
		console.log(err);
		res.json(err);
	});
}

function create (req, res) {
	
	Place.create({
		title:req.body.title,
		description: req.body.description,
		acceptsCreditCard: req.body.acceptsCreditCard,
		openHour: req.body.openHour,
		closeHour: req.body.closeHour
	}).then(doc => {
		res.json(doc);
	}).catch(err => {
		console.log(err);
		res.json(err);
	});
}

function update (req, res) {
	
	let attributes = ['title', 'description', 'acceptsCreditCard', 'openHour', 'closeHour']
	let placeParams = {}
	
	attributes.forEach(attr => {
	  if(Object.prototype.hasOwnProperty.call(req.body, attr)){
		placeParams[attr] = req.body[attr];
	  }
	});
	
	Place.findByIdAndUpdate({'_id': req.params.id}, placeParams, {new:true})
	.then(doc => {
	  res.json(doc);
	}).catch(err => {
	  console.log();
	  res.json(err);
	});
}

function destroy (req, res) {
	
	Place.findByIdAndRemove(req.params.id)
	.then(doc => {
		res.json({});
	}).catch(err => {
		console.log();
		res.json(err);
	});
}


module.exports = {index, create, show, update, destroy}