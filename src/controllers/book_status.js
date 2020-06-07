const express = require('express');
const router = express.Router();
const Book_status = require('../models/book_status');
const mongoose = require('mongoose');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// get a list of book_status from the db
router.get('/book_statues', function(req, res, next){
    Book_status.find({}).then(function(book_statues){
      res.send(book_statues);
  }); 
});

//get by id
router.get("/book_statues/:id", (req, res,next) => {
  console.log('get by id');
  // Owner.findOne({_id: req.params.id}).then(function(owner){
  //     res.send(owner); 
  // });
  if(mongoose.Types.ObjectId.isValid(req.params.id)) {
    Book_status.findOne({_id: req.params.id}).then(function (book_statu) {
          // if(err) {
          //   //res.reject(err);
          //   console.log('err');
          //   //res.sendStatus(status);
          // } else 
          if(book_statu) {
            //res.resolve({success:true,data:doc});
            console.log('succes');
            res.send(book_statu);
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

// add a new book_status to the db
router.post('/book_statues', function(req, res, next){
    Book_status.create(req.body).then(function(book_status){
      res.send(book_status);
  }).catch(next);
});

// update a book_status in the db
router.put('/book_statues/:id', function(req, res, next){
    Book_status.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    Book_status.findOne({_id: req.params.id}).then(function(book_status){
          res.send(book_status);
      });
  }).catch(next);
});

// delete a Book_status from the db
router.delete('/book_statues/:id', function(req, res, next){
    Book_status.findByIdAndRemove({_id: req.params.id}).then(function(book_status){
      res.send(Book_status);
  }).catch(next);
});

module.exports = router;
