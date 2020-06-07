const express = require('express');
const router = express.Router();
const Service = require('../models/service');
const mongoose = require('mongoose');

/* GET services listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// get a list of services from the db
router.get('/services', function(req, res, next){
  Service.find({}).then(function(services){
    res.send(services);
}); 
  // Service.geoNear(
  //     {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
  //     {maxDistance: 100000, spherical: true}
  // ).then(function(services){
  //     res.send(services);
  // }).catch(next);
});

// add a new service to the db
router.post('/services', function(req, res, next){
  Service.create(req.body).then(function(service){
      res.send(service);
  }).catch(next);
});

// update a service in the db
router.put('/services/:id', function(req, res, next){
  Service.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
      Service.findOne({_id: req.params.id}).then(function(service){
          res.send(service);
      });
  }).catch(next);
});

// delete a service from the db
router.delete('/services/:id', function(req, res, next){
  Service.findByIdAndRemove({_id: req.params.id}).then(function(service){
      res.send(service);
  }).catch(next);
});


//get by id
router.get("/services/:id", (req, res,next) => {
  console.log('get by id');
  // Owner.findOne({_id: req.params.id}).then(function(owner){
  //     res.send(owner); 
  // });
  if(mongoose.Types.ObjectId.isValid(req.params.id)) {
      Service.findOne({_id: req.params.id}).then(function (service) {
          // if(err) {
          //   //res.reject(err);
          //   console.log('err');
          //   //res.sendStatus(status);
          // } else 
          if(service) {
            //res.resolve({success:true,data:doc});
            console.log('succes');
            res.send(service);
          } else {
            res.send(404);
            console.log('no data exist for this id');
          }
      });
    } 
    else {
      console.log('Please provide correct id');
      res.send(404);
      //res.sendStatus(status);
    }
});

router.get("/services/byowner/:ownerid", (req, res,next) => {
  console.log('get by ownerid');
  // Owner.findOne({_id: req.params.id}).then(function(owner){
  //     res.send(owner); 
  // });
  if(mongoose.Types.ObjectId.isValid(req.params.ownerid)) {
      Service.findOne({Owner_Id: req.params.ownerid}).then(function (service) {
          // if(err) {
          //   //res.reject(err);
          //   console.log('err');
          //   //res.sendStatus(status);
          // } else 
          if(service) {
            //res.resolve({success:true,data:doc});
            console.log('succes');
            res.send(service);
          } else {
            res.send(404);
            console.log('no data exist for this id');
          }
      });
    } 
    else {
      console.log('Please provide correct id');
      res.send(404);
      //res.sendStatus(status);
    }
});

router.get("/services/bytype/:type", (req, res,next) => {
  console.log('get by type');
  // Owner.findOne({_id: req.params.id}).then(function(owner){
  //     res.send(owner); 
  // });
  //if(mongoose.Types.ObjectId.isValid(req.params.type)) {
      Service.find({Type: req.params.type}).then(function (service) {
          // if(err) {
          //   //res.reject(err);
          //   console.log('err');
          //   //res.sendStatus(status);
          // } else 
          if(service) {
            //res.resolve({success:true,data:doc});
            console.log('succes');
            res.send(service);
          } else {
            res.send(404);
            console.log('no data exist for this id');
          }
      });
   // } 
    // else {
    //   console.log('Please provide correct id');
    //   res.send(404);
    //   //res.sendStatus(status);
    // }
});

router.get("/services/search/:keyword", (req, res,next) => {
  console.log('search keyword');
  // Owner.findOne({_id: req.params.id}).then(function(owner){
  //     res.send(owner); 
  // });
  //if(mongoose.Types.ObjectId.isValid(req.params.type)) {
      Service.find({Name: req.params.keyword}).then(function (service) {
          // if(err) {
          //   //res.reject(err);
          //   console.log('err');
          //   //res.sendStatus(status);
          // } else 
          if(service) {
            //res.resolve({success:true,data:doc});
            console.log('succes');
            res.send(service);
          } else {
            res.send(404);
            console.log('no data exist for this id');
          }
      });
   // } 
    // else {
    //   console.log('Please provide correct id');
    //   res.send(404);
    //   //res.sendStatus(status);
    // }
});

router.get("/services/searchbyville/:ville", (req, res,next) => {
  console.log('search keyword');
  // Owner.findOne({_id: req.params.id}).then(function(owner){
  //     res.send(owner); 
  // });
  //if(mongoose.Types.ObjectId.isValid(req.params.type)) {
      Service.find({Secteur: req.params.ville}).then(function (service) {
          // if(err) {
          //   //res.reject(err);
          //   console.log('err');
          //   //res.sendStatus(status);
          // } else 
          if(service) {
            //res.resolve({success:true,data:doc});
            console.log('succes');
            res.send(service);
          } else {
            res.send(404);
            console.log('no data exist for this id');
          }
      });
   // } 
    // else {
    //   console.log('Please provide correct id');
    //   res.send(404);
    //   //res.sendStatus(status);
    // }
});

module.exports = router;
