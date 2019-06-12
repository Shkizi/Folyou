
var db = require('../dbconnect.js');



function getTopRecommendedUsers(req, res, next) {
    let params = req.query;


             db.query("Select * from (SELECT count(*) as 'recom', User_idUser FROM folyou.recomendation GROUP BY User_idUser Order by recom desc) as Countage, User, Anexes where Countage.User_idUser = idUser AND Anexes.User_idUser = idUser limit 300;",[], function (rowsKeywords, errorkey) {
                     if (errorkey && rowsKeywords == null) {
                         res.send({
                            error: true,
                            err: "Recommend Error",
                            errorObj:errorkey,
                            rows:rowsKeywords
                        });
                    } else {
                        console.log(rowsKeywords);
                        
                        res.send({
                            error: false,
                            users: rowsKeywords
                        });
                        next();
                    }
                
            });
}
module.exports = getTopRecommendedUsers;