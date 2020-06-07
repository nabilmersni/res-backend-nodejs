const express = require('express');
const router = express.Router();
const BookedSU = require('../models/bookedSU');
const mongoose = require('mongoose');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// get a list of bookedSUs from the db
router.get('/bookedSUs', function(req, res, next){
    BookedSU.find({}).then(function(bookedSUs){
      res.send(bookedSUs);
  }); 
  // User.geoNear(
  //     {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
  //     {maxDistance: 100000, spherical: true}
  // ).then(function(users){
  //     res.send(users);
  // }).catch(next);
});

//get by id
router.get("/bookedSUs/:id", (req, res,next) => {
  console.log('get by id');
  // Owner.findOne({_id: req.params.id}).then(function(owner){
  //     res.send(owner); 
  // });
  if(mongoose.Types.ObjectId.isValid(req.params.id)) {
    BookedSU.findOne({_id: req.params.id}).then(function (bookedSU) {
          // if(err) {
          //   //res.reject(err);
          //   console.log('err');
          //   //res.sendStatus(status);
          // } else 
          if(bookedSU) {
            //res.resolve({success:true,data:doc});
            console.log('succes');
            res.send(bookedSU);
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


// add a new bookedSUs to the db
router.post('/bookedSUs', function(req, res, next){
    BookedSU.create(req.body).then(function(bookedSUs){
      res.send(bookedSUs);
  }).catch(next);
});

// update a bookedSUs in the db
router.put('/bookedSUs/:id', function(req, res, next){
    BookedSU.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        BookedSU.findOne({_id: req.params.id}).then(function(bookedSUs){
          res.send(bookedSUs);
      });
  }).catch(next);
});

// delete a bookedSUs from the db
router.delete('/bookedSUs/:id', function(req, res, next){
    BookedSU.findByIdAndRemove({_id: req.params.id}).then(function(bookedSUs){
      res.send(bookedSUs);
  }).catch(next);
});

module.exports = router;
