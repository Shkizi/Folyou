var express = require('express');
var app = express();
const router = require('./routes/router.js') // aceder modulo
const port = 5500 //porta de comunicação
var bodyParser = require('body-parser');
var db = require('./services/dbconnect.js');
var cors = require('cors');
var multer  = require('multer')

var storagesheet = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/anexes/sheets')
  },
  filename: function (req, file, cb) {
    let fil = Date.now() +"-"+file.originalname
    cb(null, fil)
  }
})
var storageproposal = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/anexes/proposals')
  },
  filename: function (req, file, cb) {
    let fil = Date.now() +"-"+file.originalname
    cb(null, fil)
  }
})
var storageuser = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/anexes/profiles')
  },
  filename: function (req, file, cb) {
    let fil = Date.now() +"-"+file.originalname
    cb(null, fil)
  }
})
var uploadsheet = multer({ storage: storagesheet })
var uploadproposal = multer({ storage: storageproposal })
var uploaduser = multer({ storage: storageuser })

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
 
router.router(app,express,uploadsheet,uploadproposal,uploaduser,multer);



var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   db.query("SELECT 0 FROM dual ; ", [], function (rows, error) {
     if(error){
      console.log("Database Error: Could not connect");
     }else{
      console.log("Database Connected");
     }
   });
   console.log("Example app listening at http://%s:%s", host, port)
})