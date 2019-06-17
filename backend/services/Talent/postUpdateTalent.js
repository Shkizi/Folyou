


var db = require('../dbconnect.js');



function postUpdateTalent(req, res, next) {
    let params = req.body;
    
    let category = params.category;
    let keywords = params.keywords;
    let talentDescription = params.talentDescription;
    let talentName = params.talentName;
    let idUser = params.idUser;
    let idTalentArea = params.idTalentArea;
    
    db.query("UPDATE `folyou`.`talentarea` SET `nameTalentArea` = ?,`descriptionTalentArea` = ?,`Category_idCategory` = ? WHERE `idTalentArea` = ?;",[talentName,talentDescription,category,idTalentArea], function (rows, error) {
        if (error) {
            res.send({
                error: true,
                err: "Error",
                errorObj:error,
                rows:rows
            });
            next();
        } else {

            let query2 = "DELETE FROM `folyou`.`keyword`WHERE TalentArea_idTalentArea = ?;"
            let arrayList = [idTalentArea]
            console.log(arrayList);
            db.query(query2, arrayList, function (rows, error) {

                let arrayList2 = []
                for (let i = 0; i < params.keywords.split(",").length; i++) {
                    arrayList2.push(params.keywords.split(",")[i]);
                    arrayList2.push(idTalentArea);
                }
                let query3 = "INSERT INTO `folyou`.`keyword`(`idKeyword`,`valueProposalKeywords`,`Proposal_idProposal`,`Sheet_idSheet`,`TalentArea_idTalentArea`)VALUES(NULL,?,NULL,NULL,?);"
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
module.exports = postUpdateTalent; 