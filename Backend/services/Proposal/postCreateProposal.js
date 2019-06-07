var db = require('../dbconnect.js');



function postCreateProposal(req, res, next) {
    let params = req.body;
    let query1 ="CALL createProposal(?,?,?,?,?,?);"
    console.log(params, "This is the Create Proposal");
   
    db.query(query1,[
        params.idUser,
        params.country,
        params.region,
        params.nameProposal,
        params.proposalDescription,
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
            let query2 = "INSERT INTO `folyou`.`keyword`(`idKeyword`,`valueProposalKeywords`,`Proposal_idProposal`,`Sheet_idSheet`,`TalentArea_idTalentArea`)VALUES(NULL,?,?,NULL,NULL);"
            let arrayList = []
            for(let i = 0 ; i<params.keywords.length; i++){
                arrayList.push(params.keywords[i]);
                arrayList.push(idProposal);
            }
            console.log(arrayList);
            db.query(query2.repeat(params.keywords.length),arrayList, function (rows, error) {
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
module.exports = postCreateProposal; 