var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/olivierb', (err)=>{
    if (err) return console.log(err);
});


// efface une collection
/*mongoose.connection.on('open', function(){
mongoose.connection.db.dropCollection('articles', (err, res)=>{
        console.log('drop');
        res.json({msg:"ok"});
    });
})
*/


// Toutes mes routes
var article = require('./routes/article');

var app = express();
app.use(bodyParser.json());

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.options('/api/*', function (request, response, next) {
    response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    response.send();
});
app.use('/api', article);

app.listen(8081, function () {
  console.log('Server app listening on port 8081!');
});
