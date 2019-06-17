var db = require('../dbconnect.js');



function postUpdateProposal(req, res, next) {
    let params = req.body;
    let category = params.category; 
    let proposalDescription = params.proposalDescription; 
    let region = params.region; 
    let country = params.country.toLowerCase(); 
    let nameProposal = params.nameProposal; 
    let idUser = params.idUser; 
    let idProposal =parseInt(params.idProposal); 

    db.query("UPDATE `folyou`.`proposal` SET `countryProposal` = ?,`regionProposal` = ?,`nameProposal` = ?,`descriptionProposal` = ?,`Category_idCategory` = ? WHERE `idProposal` = ?;",[country, region,nameProposal,proposalDescription,category,idProposal], function (rows, error) {
        if (error) {
            res.send({
                error: true,
                err: "Error",
                errorObj:error,
                rows:rows
            });
            next();
        } else {

            let query2 = "DELETE FROM `folyou`.`keyword`WHERE Proposal_idProposal = ?;"
            let arrayList = [idProposal]
            console.log(arrayList);
            db.query(query2, arrayList, function (rows, error) {

                let arrayList2 = []
                for (let i = 0; i < params.keywords.split(",").length; i++) {
                    arrayList2.push(params.keywords.split(",")[i]);
                    arrayList2.push(idProposal);
                }
                let query3 = "INSERT INTO `folyou`.`keyword`(`idKeyword`,`valueProposalKeywords`,`Proposal_idProposal`,`Sheet_idSheet`,`TalentArea_idTalentArea`)VALUES(NULL,?,?,NULL,NULL);"
                db.query(query3.repeat(params.keywords.split(",").length), arrayList2, function (rows, error) {
                    if (error) {
                        res.send({
                            error: true,
                            err: "Error",
                            errorObj: error,
                            rows: rows
                        });
                        next();
                    } else {
                        res.status(200).send({
                            error: false
                        });
                        next();
                    }
                });
            });
        }
    
    });
   
}
module.exports = postUpdateProposal; 