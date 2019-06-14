

var db = require('../dbconnect.js');



function getTopBadgeUsers(req, res, next) {
    let params = req.query;


             db.query("SELECT count(*) as 'numBadge', user.*, anexes.* FROM folyou.badgeuser, folyou.user, folyou.anexes WHERE badgeuser.User_idUser=user.idUser and anexes.User_idUser = user.idUser GROUP BY user.idUser ORDER BY 'numBadge';",[], function (rowsKeywords, errorkey) {
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
module.exports = getTopBadgeUsers;