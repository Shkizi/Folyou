var User = require("../../DataModels/User.js");
var db = require('../dbconnect.js');
var crypto = require('crypto');


//gets a user by its email and hashed password with sha256
//example: localhost:5500/getUser?passwordUser=[hash]&emailUser=andre@outlook.pt
// for password use  var hash = crypto.createHash('sha256').update(params.passwordUser).digest('hex');
function getUserLogin(req, res) {
    let params=req.query;
   
    db.query("SELECT * FROM `User`, `Anexes` WHERE  `User`.`idUser`= `Anexes`.`User_idUser` AND `emailUser` LIKE ? AND `passwordUser` LIKE ? ; ", 
    [ 
      params.emailUser,
      crypto.createHash('sha256').update(params.passwordUser).digest('hex')
    ], function (rows, error) {
          
            if(error){
                res.send({error: true,verified:false, err: error});
            }else{
              if(rows.length <=0){
                res.send({error: false,verified:false});         
              }else{
                var row=rows[0];
                row.anexes={
                  idAnexes:row.idAnexes,
                  fileName:row.fileName            
                }
                var session = crypto.createHash('sha256').update( makeid()).digest('hex');
                // TODO: create new session in database 
                
                db.query("INSERT INTO `folyou`.`userloginhistory`(`idUserLoginHistory`,`loginTimestamp`,`expireTimestamp`,`loginKey`,`User_idUser`) VALUES (NULL, NOW(), NOW() + INTERVAL 2 DAY, ?, ?); ", [session,row.idUser], function (rows, error) {
          
                  if(error){
                    res.send({error: true,verified:false, err:error});         
                  }else{
                    res.send({error: false,verified:true, user: row, session:session});
                  }
                });
                
                
              }
            }
          });
}
module.exports = getUserLogin;


function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-*/=()$#%&!|";
  
    for (var i = 0; i < 200; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }