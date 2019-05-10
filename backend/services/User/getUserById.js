var User = require("../../DataModels/User.js");
var db = require('../dbconnect.js');
var crypto = require('crypto');


//gets a user by its email and hashed password with sha256
//example: localhost:5500/getUser?emailUser=andre@outlook.pt
// for password use  var hash = crypto.createHash('sha256').update(params.passwordUser).digest('hex');
function getUserById(req, res,next) {
    let params=req.query;
   
    db.query("SELECT * FROM `User`, `Anexes` WHERE `idUser` = ? AND `User`.`idUser`= `Anexes`.`User_idUser` ; ", [params.idUser], function (rows, error) {
          
            if(error){
                res.send({error: true, err: error});
            }else{
            var row=rows[0];
            
           

            let user =row;
            user.anexes={
                  idAnexes:row.idAnexes,
                  fileName:row.fileName            
            }
            
            res.send({error: false, user: user});     
            
            next();
            }
              
            
          });

   

}
module.exports = getUserById;