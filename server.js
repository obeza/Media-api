var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");
var mongoose = require('mongoose');
const cors = require('cors');
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
var articleRoute = require('./routes/article');
var uploadRoute = require('./routes/upload');
var appRoute = require('./routes/app');

var app = express();
app.use(bodyParser.json());
//app.use(express.static("public"));
app.use('/images', express.static('public'));

app.use(cors({credentials: true, origin: 'http://localhost:4200'})); 

/*app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Credentials', true);
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.options('/api/*', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    response.send();
});*/


app.use('/api', articleRoute);
app.use('/upload', uploadRoute);
app.use('/app', appRoute);

app.listen(8081, function () {
  console.log('Server app listening on port 8081!');
});
