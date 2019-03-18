var express = require('express');
var app = express();
const router = require('./routes/router.js') // aceder modulo
const port = 5500 //porta de comunicação
var bodyParser = require('body-parser');
var cors = require('cors');
require('events').EventEmitter.defaultMaxListeners = 100;
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies
app.use('/public', express.static(__dirname + '/public'));

var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
     callback(new Error('Not allowed by CORS'))

    }
  }
}

app.use(cors(corsOptions));



app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });
 
router.router(app,express);



var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})