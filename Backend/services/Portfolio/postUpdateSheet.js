var db = require('../dbconnect.js');



function postUpdateSheet(req, res, next, upload, multer) {
    let params = req.body;
    let idSheet = parseInt(params.idSheet);
    let idUser = params.idUser;
    let nameProposal = params.nameProposal;
    let sheetDescription = params.sheetDescription;
    let category = params.category;
    let country = params.country.toLowerCase();
    let region = params.region;
    let arr = [nameProposal, sheetDescription, category, country, region, idSheet];

    db.query("UPDATE `folyou`.`sheet` SET `nameSheet` = ?,`descriptionSheet` = ?,`Category_idCategory` = ?,`countrySheet` = ?,`regionSheet` = ? WHERE `idSheet` = ?;", arr, function (rows, error) {
        if (error) {
            res.send({
                error: true,
                err: "Error",
                errorObj: error,
                rows: rows
            });
        } else {

            let query2 = "DELETE FROM `folyou`.`keyword`WHERE Sheet_idSheet = ?;"
            let arrayList = [idSheet]
            console.log(arrayList);
            db.query(query2, arrayList, function (rows, error) {

                let arrayList2 = []
                for (let i = 0; i < params.keywords.split(",").length; i++) {
                    arrayList2.push(params.keywords.split(",")[i]);
                    arrayList2.push(idSheet);
                }
                let query3 = "INSERT INTO `folyou`.`keyword`(`idKeyword`,`valueProposalKeywords`,`Proposal_idProposal`,`Sheet_idSheet`,`TalentArea_idTalentArea`)VALUES(NULL,?,NULL,?,NULL);"
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
module.exports = postUpdateSheet;