var express = require('express');
var app = express();
const router = require('./routes/router.js') // aceder modulo
const port = 5500 //porta de comunicação
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

router.router(app,express);



var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})