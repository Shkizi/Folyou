var db = require('../dbconnect.js');


//gets a user by its email and hashed password with sha256
//example: localhost:5500/getUser?emailUser=andre@outlook.pt
// for password use  var hash = crypto.createHash('sha256').update(params.passwordUser).digest('hex');
function getTalentByIdRecent(req, res, next) {
    let params = req.query;

    db.query("SELECT * FROM `TalentArea`, `Category`, `User`,"+
    "(SELECT TalentArea_idTalentArea, GROUP_CONCAT(DISTINCT valueProposalKeywords) keywords "+
    "FROM keyword WHERE TalentArea_idTalentArea IS NOT NULL "+
   "GROUP BY TalentArea_idTalentArea ) AS keywords,(SELECT filename as `avatarUser`, User_idUser from Anexes) as avatar " +
    "  WHERE `Category`.`idCategory` =`TalentArea`.`Category_idCategory`"+
    " AND `User`.`idUser` = `TalentArea`.`User_idUser` AND `User`.`idUser` = avatar.User_idUser "+
    "AND  keywords.TalentArea_idTalentArea = idTalentArea "+
    "ORDER BY `TalentArea`.`timestamp` DESC LIMIT ? ; ",[parseInt(params.limit)] , function (rows, error) {
        console.log(params);
        if (!error) {
            
            rows.forEach((valuePort,indexPort,arrayPort)=>{   rows[indexPort].keywords=rows[indexPort].keywords.split(","); });
            console.log(rows);
            res.send({
                error: false,
                talentList: rows
            });
            next();
        } else {
            res.send({
                error: true,
                err: "createdTimestamp Error",
                errorObj:error,
                rows:rows
            });
            
        }
    });
}
module.exports = getTalentByIdRecent;