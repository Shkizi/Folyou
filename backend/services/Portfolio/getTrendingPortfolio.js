var db = require('../dbconnect.js');



//gets a user by its email and hashed password with sha256
//example: localhost:5500/getUser?emailUser=andre@outlook.pt
// for password use  var hash = crypto.createHash('sha256').update(params.passwordUser).digest('hex');
function getTrendingPortfolio(req, res, next) {
    let params = req.query;

    db.query("SELECT *, count(*) as `contage` FROM `Iteraction`,`Sheet`,`Portfolio`, `Category`, `User`,(SELECT Sheet_idSheet, GROUP_CONCAT(DISTINCT valueProposalKeywords) keywords FROM keyword WHERE Sheet_idSheet IS NOT NULL  GROUP BY Sheet_idSheet ) AS keywords ,(SELECT filename as `avatarUser`, User_idUser from Anexes) as avatar WHERE `Category`.`idCategory` =`Sheet`.`Category_idCategory` AND `User`.`idUser` = `Portfolio`.`User_idUser` AND `User`.`idUser` = avatar.User_idUser AND `Sheet`.`idSheet` = `Portfolio`.`Sheet_idSheet`AND  keywords.Sheet_idSheet = idSheet AND `Iteraction`.`Sheet_idSheet`= `Sheet`.`idSheet` GROUP BY `Sheet`.`idSheet`ORDER BY `contage`  DESC LIMIT 2 ;",[] , function (rows, error) {
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
module.exports = getTrendingPortfolio;