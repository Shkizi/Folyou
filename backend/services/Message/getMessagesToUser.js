


var db = require('../dbconnect.js');



function getMessagesToUser(req, res, next) {
    let params = req.query;


             db.query("SELECT * FROM folyou.message, `User`, `Anexes` WHERE `idUser` = Message.User_idUser AND `User`.`idUser`= `Anexes`.`User_idUser` AND  User_idUser1 = ? order by idMessage asc;",
             [params.idUser], function (rowsKeywords, errorkey) {
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