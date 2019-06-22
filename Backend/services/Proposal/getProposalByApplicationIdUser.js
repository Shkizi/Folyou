var db = require('../dbconnect.js');


//gets a user by its email and hashed password with sha256
//example: localhost:5500/getUser?emailUser=andre@outlook.pt
// for password use  var hash = crypto.createHash('sha256').update(params.passwordUser).digest('hex');
function getProposalByApplicationIdUser(req, res, next) {
    let params = req.query;

    db.query("SELECT * FROM applicationstate,proposalstate, User  RIGHT JOIN applicationteamuser    ON user.idUser = applicationteamuser.User_idUser    RIGHT JOIN applicationteam    ON applicationteam.idApplicationTeam = applicationteamuser.ApplicationTeam_idApplicationTeam    RIGHT JOIN application    ON applicationteam.idApplicationTeam = application.ApplicationTeam_idApplicationTeam    RIGHT JOIN proposal    ON proposal.idProposal = application.Proposal_idProposal  "+
     "RIGHT JOIN (SELECT Proposal_idProposal, GROUP_CONCAT( fileName) fil FROM anexes WHERE Proposal_idProposal IS NOT NULL GROUP BY Proposal_idProposal ) AS anexedfiles ON " + " anexedfiles.Proposal_idProposal = idProposal "+
    "WHERE idUser = ? AND proposalstate.idProposalState = proposal.ProposalState_idProposalState AND applicationstate.idApplicationState = application.ApplicationState_idApplicationState; ",[parseInt(params.idUser)] , function (rows, error) {
        console.log(params);
        if (!error) {
            console.log(rows);
            res.send({
                error: false,
                table: rows
            });
            next();
        } else {
            res.send({
                error: true,
                err: " Error Table",
                errorObj:error,
                rows:rows
            });
        }
    });
}
module.exports = getProposalByApplicationIdUser;