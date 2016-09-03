'use strict';

var express = require('express');
var router = express.Router();
const cors = require('cors');
var multer = require('multer');
//var upload = multer({dest: 'public'});


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb, next) {
    console.log( req.body.myvar );
    if ( file){
      let fileName = req.params.type + '-' + req.params.id + '.jpg';
      cb(null, fileName );
    }

  }
})

var upload = multer({ storage: storage })


router.post( '/upload/:type/:id', upload.any(), (req, res)=>{

  console.log('token ' + req.headers.authorization );
  
  res.json({code:'ok'});

});



module.exports = router;