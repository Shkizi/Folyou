var User = require("../../DataModels/User.js");
var db = require('../dbconnect.js');
var crypto = require('crypto');


//gets a user by its email and hashed password with sha256
//example: localhost:5500/getUser?emailUser=andre@outlook.pt
// for password use  var hash = crypto.createHash('sha256').update(params.passwordUser).digest('hex');
function getUserBySession(req, res,next) {
    let params=req.query;
   
    db.query("SELECT * FROM `User`, `Anexes`, userloginhistory WHERE `loginKey` LIKE ? AND `User`.`idUser`= `Anexes`.`User_idUser` AND `User`.`idUser`= `userloginhistory`.`User_idUser` AND expireTimestamp > NOW() ; ", [params.userLogged], function (rows, error) {
          
            if(error){
                res.send({error: true, err: error});
            }else{
                if(rows.length<=0){
                    res.send({error: false, user: null});     
           
                }else{
            var row=rows[0];
            let user =row;
            user.anexes={
                  idAnexes:row.idAnexes,
                  fileName:row.fileName            
            }
            
            res.send({error: false,verified:true, user: row, session:params.userLogged});
            
            next();
        }
            }
          });

   

}
module.exports = getUserBySession;