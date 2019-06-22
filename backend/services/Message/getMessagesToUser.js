


var db = require('../dbconnect.js');



function getMessagesToUser(req, res, next) {
    let params = req.query;


             db.query("SELECT * FROM folyou.message, `User`, `Anexes`, (SELECT idUser AS SECidUser,nameUser AS SECnameUser  FROM User) as secUser, (SELECT User_idUser AS SECUser_idUser ,fileName as SECfileName FROM Anexes) as secAne  WHERE (`idUser` = Message.User_idUser AND `SECidUser` = Message.User_idUser1)  AND `User`.`idUser`= `Anexes`.`User_idUser` AND `secUser`.`SECidUser`= `secAne`.`SECUser_idUser` AND `message`.`User_idUser`= User.idUser AND `message`.`User_idUser1` = secUser.SECidUser  AND  (Message.User_idUser1 = ? OR Message.User_idUser = ?) order by idMessage desc;",
             [params.idUser,params.idUser], function (rowsKeywords, errorkey) {
                     if (errorkey && rowsKeywords == null) {
                         res.send({
                            error: true,
                            err: "Message Error",
                            errorObj:errorkey,
                            rows:rowsKeywords
                        });
                    } else {
                        console.log(rowsKeywords);
                        
                        res.send({
                            error: false,
                            messages: rowsKeywords
                        });
                        next();
                    }
                
            });
}
module.exports = getMessagesToUser;