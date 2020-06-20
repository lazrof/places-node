var express = require('express');
var router = express.Router();

const Place = require('../models/Place');

router.route('/')
    .get( (req, res) => {
        
        Place.find({})
            .then(docs => {
                res.json(docs);
            }).catch(err => {
                console.log(err);
                res.json(err);
            });
      
    })
    .post( (req, res) => {

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
    });

router.route('/:id')
    .get( (req, res) => {
        
        Place.findById(req.params.id)
            .then(doc => {
            res.json(doc);
            }).catch(err =>{
            console.log(err);
            res.json(err);
        });

    })
    .put((req, res) => {

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

    })
    .delete(  (req, res) => {

        Place.findByIdAndRemove(req.params.id)
          .then(doc => {
            res.json({});
        }).catch(err => {
            console.log();
            res.json(err);
        });

    })

module.exports = router; 