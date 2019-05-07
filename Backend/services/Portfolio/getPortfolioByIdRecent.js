var User = require("../../DataModels/User.js");
var db = require('../dbconnect.js');
var crypto = require('crypto');


//gets a user by its email and hashed password with sha256
//example: localhost:5500/getUser?emailUser=andre@outlook.pt
// for password use  var hash = crypto.createHash('sha256').update(params.passwordUser).digest('hex');
function getPortfolioByIdRecent(req, res, next) {
    let params = req.query;

    db.query("SELECT * FROM `Sheet`,`Portfolio`, `Category`, `User`,"+
    "(SELECT Sheet_idSheet, GROUP_CONCAT(DISTINCT valueProposalKeywords) keywords "+
    "FROM keyword WHERE Sheet_idSheet IS NOT NULL "+
   "GROUP BY Sheet_idSheet ) AS keywords " +
    "  WHERE `Category`.`idCategory` =`Sheet`.`Category_idCategory`"+
    " AND `User`.`idUser` = `Portfolio`.`User_idUser` "+
    "AND `Sheet`.`idSheet` = `Portfolio`.`Sheet_idSheet`"+
    "AND  keywords.Sheet_idSheet = idSheet "+
    "ORDER BY `Sheet`.`createdTimestamp` DESC LIMIT ? ; ",[parseInt(params.limit)] , function (rows, error) {
        console.log(params);
        if (!error) {
            rows.forEach((valuePort,indexPort,arrayPort)=>{   rows[indexPort].keywords=rows[indexPort].keywords.split(","); });
            console.log(rows);
            res.send({
                error: false,
                portfolioList: rows
            });
            next();
        } else {
            res.send({
                error: true,
                err: "Error Portfolio",
                errorObj:error,
                rows:rows
            }); 
        }
    });
}
module.exports = getPortfolioByIdRecent;