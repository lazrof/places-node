var express = require('express');
var router = express.Router();

const placesController = require('../controllers/PlacesController');

router.route('/')
    .get(placesController.index)
    .post(placesController.multerMiddleware(), placesController.create);

router.route('/:id')
    // los metodos HTTP pueden recibir varios middlewares aparte de controladores
    .get(placesController.find, placesController.show)
    .put(placesController.find, placesController.update)
    .delete(placesController.find, placesController.destroy)

module.exports = router; 