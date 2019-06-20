var User = require("../../DataModels/User.js");
var db = require('../dbconnect.js');
var crypto = require('crypto');


//gets a user by its email and hashed password with sha256
//example: localhost:5500/getUser?emailUser=andre@outlook.pt
// for password use  var hash = crypto.createHash('sha256').update(params.passwordUser).digest('hex');
function getUserById(req, res,next) {
    let params=req.query;
   
    db.query("SELECT * FROM `User`, `Anexes`,`UserMedia` WHERE `idUser` = ? AND `User`.`idUser`= `Anexes`.`User_idUser` and `UserMedia`.User_idUser = User.idUser ; ", [params.idUser], function (rows, error) {
          
            if(error){
                res.send({error: true, err: error});
            }else{
            
            let user =rows[0];
            user.anexes={
                  idAnexes:rows[0].idAnexes,
                  fileName:rows[0].fileName            
            }
            
            res.send({error: false, user: user});     
            
            next();
            }
              
            
          });

   

}
module.exports = getUserById;