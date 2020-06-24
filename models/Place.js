const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate'); // esta bueno el plugin pero tambien se puede hacer a mano
const uploader = require('./Uploader');

let placeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    acceptsCreditCard: {
        type: Boolean,
        default: false
    },
    coverImage: String,
    avatarImage: String,
    openHour: Number,
    closeHour: Number
});

placeSchema.methods.updateImage = function (path, imageType) {
    //Primero subir la images
    //Luego guardar
    // Aca estamos usando una promesa que adentro usa otra promesa, y me imagino
    // que lo que devolvemos es la ultima promesa si no hay errores
    return uploader(path)
        .then(secure_url => this.saveImageUrl(secure_url, imageType));
}

placeSchema.methods.saveImageUrl = function (secureUrl, imageType) {
    this[imageType+'Image'] = secureUrl;
    return this.save();
}

placeSchema.plugin(mongoosePaginate);

let Place = mongoose.model('Place', placeSchema);

module.exports = Place;