var db = require('../dbconnect.js');



function postClicks(req, res, next) {
    let params = req.body;
    let query1 =""
    console.log(params, "This is the postclick");
    switch(params.type){
        case "proposalSheet":query1 ="INSERT INTO `folyou`.`iteraction`(`idIteraction`,`User_idUser`,`TalentArea_idTalentArea`,`Proposal_idProposal`,`Sheet_idSheet`,`timestamp`,`InterationType_idInterationType`)VALUES(NULL,"+((params.idUser!="null")?"?":"NULL")+",NULL,?,NULL,NOW(),2);"
        break;
        case "talentSheet":query1 ="INSERT INTO `folyou`.`iteraction`(`idIteraction`,`User_idUser`,`TalentArea_idTalentArea`,`Proposal_idProposal`,`Sheet_idSheet`,`timestamp`,`InterationType_idInterationType`)VALUES(NULL,"+((params.idUser!="null")?"?":"NULL")+",?,NULL,NULL,NOW(),2);"
        break;
        case "portfolioSheet":query1 ="INSERT INTO `folyou`.`iteraction`(`idIteraction`,`User_idUser`,`TalentArea_idTalentArea`,`Proposal_idProposal`,`Sheet_idSheet`,`timestamp`,`InterationType_idInterationType`)VALUES(NULL,"+((params.idUser!="null")?"?":"NULL")+",NULL,NULL,?,NOW(),2);"
        break;
        default:
        res.send({error:false});
        return; 
        break;
    }
    
    let arr =[];
    if(params.idUser!="null")
        arr.push(params.idUser);
    arr.push(params.idClicked);
    db.query(query1,arr, function (rows, error) {
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
module.exports = postClicks;