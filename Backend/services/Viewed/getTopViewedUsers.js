
var db = require('../dbconnect.js');



function getTopViewedUsers(req, res, next) {
    let params = req.query;


             db.query("SELECT count(*) as 'views', user.*, anexes.* FROM folyou.iteraction,folyou.anexes, folyou.user, folyou.talentarea,folyou.proposal,folyou.sheet, folyou.portfolio WHERE InterationType_idInterationType=2 AND (user.idUser = talentarea.User_idUser AND user.idUser = proposal.User_idUser AND (user.idUser = portfolio.User_idUser AND portfolio.Sheet_idSheet=sheet.idSheet )) AND (iteraction.TalentArea_idTalentArea = talentarea.idTalentArea OR 	iteraction.Proposal_idProposal = proposal.idProposal OR     iteraction.Sheet_idSheet = sheet.idSheet ) AND user.idUser = anexes.User_idUser GROUP BY user.idUser Order by 'views' desc;",[], function (rowsKeywords, errorkey) {
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