


var db = require('../dbconnect.js');



function postCreateTalent(req, res, next) {
    let params = req.body;
    let query1 ="call createTalentArea(?,?,1,?,?)"
    console.log(params, "This is the Create Talent");
    
    db.query(query1,[
        
        params.talentName,
        params.talentDescription,
        params.idUser,        
        params.category
    ], function (rows, error) {
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
            let idProposal=rows[0][0].insId;
            let query2 = "INSERT INTO `folyou`.`keyword`(`idKeyword`,`valueProposalKeywords`,`Proposal_idProposal`,`Sheet_idSheet`,`TalentArea_idTalentArea`)VALUES(NULL,?,NULL,NULL,?);"
            let arrayList = []
            for(let i = 0 ; i<params.keywords.split(",").length; i++){
                arrayList.push(params.keywords.split(",")[i]);
                arrayList.push(idProposal);
            }
            console.log(arrayList);
            db.query(query2.repeat(params.keywords.split(",").length),arrayList, function (rows, error) {
                if (error) {
                    res.send({
                        error: true,
                        err: "Error",
                        errorObj:error,
                        rows:rows
                    });
                    next();
                } else {
                    res.send({error:false});
                    next();
                }
            
            });
        }
    
    });
   
}
module.exports = postCreateTalent; 