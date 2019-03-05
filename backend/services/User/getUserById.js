var User = require("../../DataModels/User.js");
var db = require('../dbconnect.js');
var crypto = require('crypto');


//gets a user by its email and hashed password with sha256
//example: localhost:8081/getUser?emailUser=andre@outlook.pt
// for password use  var hash = crypto.createHash('sha256').update(params.passwordUser).digest('hex');
function getUserById(req, res) {
    let params=req.query;
   
    db.query("SELECT * FROM `User` WHERE `idUser` = ? ; ", [params.idUser], function (rows, error) {
          
            if(error){
                res.send({error: true, err: error});
            }else{
            var row=rows[0];
            var idUser = row.idUser;
            var nameUser = row.nameUser;
            var emailUser = row.emailUser;
            var passwordUser = row.passwordUser;
            var isAdmin = row.isAdmin;
            var countryUser = row.countryUser;
            var regionUser = row.regionUser;
            var addressUser = row.addressUser;
            var languageUser = row.languageUser;
            var isActivated = row.isActivated;
            var createdTimestamp = row.createdTimestamp;

            let user = new User(idUser, nameUser, emailUser, passwordUser, isAdmin, countryUser, regionUser, addressUser, languageUser, isActivated, createdTimestamp);
        
            res.send({error: false, user: user});         
            }
              
            
          });

   

}
module.exports = getUserById;