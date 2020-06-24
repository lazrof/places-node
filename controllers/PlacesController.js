const Place = require('../models/Place');
const upload = require('../config/upload');
const uploader = require('../models/Uploader');

// middleware
function find(req, res, next) {

	// params viene de 'places/:id'
	Place.findById(req.params.id)
	.then(place => {
		req.place = place;
		next();
	}).catch(err => {
		next(err);
	})
	
}


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

// detail view
function show (req, res) {
	res.json(req.place);
}

function create (req, res, next) {
	
	Place.create({
		title:req.body.title,
		description: req.body.description,
		acceptsCreditCard: req.body.acceptsCreditCard,
		openHour: req.body.openHour,
		closeHour: req.body.closeHour
	}).then(doc => {
		req.place = doc;
		next();
	}).catch(err => {
		console.log(err);
		next(err)
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

	// req.place es el target y placeParams es el la fuente con los campos que vienen del request
	// Object.assign hace un merge de las fuentes y hacia el target
	req.place = Object.assign(req.place, placeParams);
	
	req.place.save().then(doc => {
	  res.json(doc);
	}).catch(err => {
	  console.log();
	  res.json(err);
	});
}

function destroy (req, res) {
	
	req.place.remove().then(doc => {
		res.json({});
	}).catch(err => {
		console.log();
		res.json(err);
	});
}


function multerMiddleware() {
	// si es un solo archivo usamos .single
	// maxCount para multiples archivos
	// el resultado de este return es un middleware por eso, en las routes queda instanciada la función
	return upload.fields([
		{name: 'avatar', maxCount:1},
		{name: 'cover', maxCount:1},
	])
}

function saveImage(req, res) {
	if(req.place){

		const files = ['avatar', 'cover'];
		
		// como todas las peticiones son asincronas, no tenemos manera de saber facilmente cuando 
		// se subio verdaderamente la foto, para eso usamos promesas, y guardamos cada una de las
		// promesas cada petición
		const promises = []; 

		files.forEach(imageType => {
			
			if(req.files && req.files[imageType]){
				let path = req.files[imageType][0].path;
				promises.push(req.place.updateImage(path, imageType));
			}
		})
		
		// Promises.all() captura todas las promisas que se le manden y no continua con el
		// .then() hasta que todas esten resueltas. Muy util porque aqui necesitamos subir las 
		// 2 imagenes a cloudinary
		Promise.all(promises).then(results =>{
			console.log(results);
			res.json(req.place);
		}).catch(err => {
			console.log(err);
			res.json(err);
		});


	}else{
		res.status(422).json({
			error: req.error || 'Could not save place'
		});
	}
	
}

module.exports = {index, create, show, update, destroy, find, multerMiddleware, saveImage}