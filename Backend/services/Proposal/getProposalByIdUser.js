var db = require('../dbconnect.js');


//gets a user by its email and hashed password with sha256
//example: localhost:5500/getUser?emailUser=andre@outlook.pt
// for password use  var hash = crypto.createHash('sha256').update(params.passwordUser).digest('hex');
function getProposalByIdUser(req, res, next) {
    let params = req.query;

    db.query("SELECT * FROM `Proposal`, `Category`, `User`, "+
    "(SELECT Proposal_idProposal, GROUP_CONCAT( fileName) fil FROM anexes WHERE Proposal_idProposal IS NOT NULL GROUP BY Proposal_idProposal ) AS anexedfiles, " + 
    "(SELECT Proposal_idProposal, GROUP_CONCAT(DISTINCT valueProposalKeywords) keywords"+
    " FROM keyword WHERE Proposal_idProposal IS NOT NULL "+
   "GROUP BY Proposal_idProposal ) AS keywords ,(SELECT filename as `avatarUser`, User_idUser from Anexes) as avatar  " +
    " WHERE `Category`.`idCategory` =`Proposal`.`Category_idCategory`"+
    " AND `User`.`idUser` = `Proposal`.`User_idUser` AND `User`.`idUser` = avatar.User_idUser AND `User`.`idUser` = ? "+
    "AND  keywords.Proposal_idProposal = idProposal "+
    "AND anexedfiles.Proposal_idProposal = idProposal "+
    "ORDER BY `Proposal`.`createdTimestamp` DESC LIMIT ? ; ",[parseInt(params.idUser),parseInt(params.limit)] , function (rows, error) {
        console.log(params);
        if (!error) {
            rows.forEach((valuePort,indexPort,arrayPort)=>{   rows[indexPort].keywords=rows[indexPort].keywords.split(","); });
            console.log(rows);
            res.send({
                error: false,
                proposalList: rows
            });
            next();
        } else {
            res.send({
                error: true,
                err: " Error Proposal",
                errorObj:error,
                rows:rows
            });
        }
    });
}
module.exports = getProposalByIdUser;