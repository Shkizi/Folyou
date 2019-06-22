
var db = require('../dbconnect.js');



function getTopViewedUsers(req, res, next) {
    let params = req.query;


             db.query("SELECT count(*) as views, user.*, anexes.* FROM anexes, user, iteraction LEFT JOIN talentarea on talentarea.idTalentArea=iteraction.TalentArea_idTalentArea  LEFT JOIN proposal on iteraction.Proposal_idProposal = proposal.idProposal LEFT JOIN sheet on iteraction.Sheet_idSheet = sheet.idSheet LEFT JOIN portfolio on portfolio.Sheet_idSheet=sheet.idSheet  WHERE InterationType_idInterationType=2 AND user.idUser = anexes.User_idUser  AND (user.idUser = talentarea.User_idUser or user.idUser = proposal.User_idUser or user.idUser = portfolio.User_idUser) GROUP BY user.idUser Order by views desc; ",[], function (rowsKeywords, errorkey) {
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
module.exports = getTopViewedUsers;