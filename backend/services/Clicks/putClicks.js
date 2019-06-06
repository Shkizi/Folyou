var db = require('../dbconnect.js');



function putClicks(req, res, next) {
    let params = req.body;
    let query1 =""
    console.log(params, "This is the putclick");
    switch(params.type){
        case "proposalSheet":query1 ="INSERT INTO `folyou`.`iteraction`(`idIteraction`,`User_idUser`,`TalentArea_idTalentArea`,`Proposal_idProposal`,`Sheet_idSheet`,`timestamp`,`InterationType_idInterationType`)VALUES(NULL,?,NULL,?,NULL,NOW(),2);"
        break;
        case "talentSheet":query1 ="INSERT INTO `folyou`.`iteraction`(`idIteraction`,`User_idUser`,`TalentArea_idTalentArea`,`Proposal_idProposal`,`Sheet_idSheet`,`timestamp`,`InterationType_idInterationType`)VALUES(NULL,?,?,NULL,NULL,NOW(),2);"
        break;
        case "portfolioSheet":query1 ="INSERT INTO `folyou`.`iteraction`(`idIteraction`,`User_idUser`,`TalentArea_idTalentArea`,`Proposal_idProposal`,`Sheet_idSheet`,`timestamp`,`InterationType_idInterationType`)VALUES(NULL,?,NULL,NULL,?,NOW(),2);"
        break;
        default:
        res.send({error:false});
        return; 
        break;
    }
    db.query(query1,[params.idUser,params.idClicked], function (rows, error) {
        if (error) {
            res.send({
                error: true,
                err: "Error",
                errorObj:error,
                rows:rows
            });
            next();
        } else {
            console.log(rows);
            res.send({error:false});
            next();
        }
    
    });
}
module.exports = putClicks;