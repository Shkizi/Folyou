var db = require('../dbconnect.js');



function getNumberUnviewedMessages(req, res, next) {
    let params = req.query;


             db.query("SELECT count(*) as 'number' FROM folyou.message where viewed = 0 and User_idUser1 = ?;",
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
                            number: rowsKeywords[0].number
                        });
                        next();
                    }
                
            });
}
module.exports = getNumberUnviewedMessages;