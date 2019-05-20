var User = require("../../DataModels/User.js");
var db = require('../dbconnect.js');
var crypto = require('crypto');


//gets a user by its email and hashed password with sha256
//example: localhost:5500/getUser?emailUser=andre@outlook.pt
// for password use  var hash = crypto.createHash('sha256').update(params.passwordUser).digest('hex');
function getProposalById(req, res, next) {
    let params = req.query;

    db.query("SELECT * FROM `Proposal`, `Category`, `User`, "+
    "(SELECT Proposal_idProposal, GROUP_CONCAT(DISTINCT valueProposalKeywords) keywords"+
    " FROM keyword WHERE Proposal_idProposal IS NOT NULL "+
   "GROUP BY Proposal_idProposal ) AS keywords ,(SELECT filename as `avatarUser`, User_idUser from Anexes) as avatar  " +
    " WHERE `Category`.`idCategory` =`Proposal`.`Category_idCategory`"+
    " AND `User`.`idUser` = `Proposal`.`User_idUser` AND `User`.`idUser` = avatar.User_idUser "+
    "AND  keywords.Proposal_idProposal = idProposal "+
    "ORDER BY `Proposal`.`createdTimestamp`;",[], function (rows, error) {
        if (!error) {
            console.log(rows);
             db.query("SELECT * FROM `Keyword`; ",[], function (rowsKeywords, errorkey) {
                     if (errorkey && rowsKeywords == null) {
                         res.send({
                            error: true,
                            err: "Keyword Error",
                            errorObj:error,
                             rows:rows
                        });
                    } else {
                        rows.forEach((valuePort,indexPort,arrayPort)=>{   rows[indexPort].keywords=[]; });
                        rows.forEach((valuePort,indexPort,arrayPort)=>{    
                            rowsKeywords.forEach((value, index, array)=> {
                                if(rows[indexPort].idProposal==rowsKeywords[index].Proposal_idProposal){
                                    rows[indexPort].keywords.push(rowsKeywords[index].valueProposalKeywords);
                                }
                               
                            });
                        });
                        console.log(rows);
                        res.send({
                            error: false,
                            proposalList: rows
                        });

                        next();
                    }
                
            });
        } else {
            res.send({
                error: true,
                err: "Sheet Error",
                errorObj:error,
                rows:rows
            });
            
        }
    });
}
module.exports = getProposalById;