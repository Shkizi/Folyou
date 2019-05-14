var User = require("../../DataModels/User.js");
var db = require('../dbconnect.js');
var crypto = require('crypto');


//gets a user by its email and hashed password with sha256
//example: localhost:5500/getUser?passwordUser=[hash]&emailUser=andre@outlook.pt
// for password use  var hash = crypto.createHash('sha256').update(params.passwordUser).digest('hex');
function getUsers(req, res) {
    let params=req.query;
   
    db.query("SELECT * FROM `User`", [], function (rows, error) {
          
            if(error){
                res.send({error: true, err: error});
            }else{
          
           
        
        res.send({error: false, user: rows});         
        }
              
            
          });

   

}
module.exports = getUsers;

