var db = require('../dbconnect.js');



function postCreateSheet(req, res,next,upload,multer) {
    let params = req.body;
    let idSheet = 0;
    let name = req.file.filename;
     db.query("CALL createSheet(?,?,NOW(),?,?,?,?,?,?)",[params.nameProposal,params.sheetDescription,0,name,params.category,params.country.toLowerCase(),params.region,params.idUser], function (rows, error) {
        if (error) {
            res.send({
                error: true,
                err: "Error",
                errorObj:error,
                rows:rows
            });
        }
        else{
           
            idSheet = rows[0][0].insId;
            let query2 = "INSERT INTO `folyou`.`keyword`(`idKeyword`,`valueProposalKeywords`,`Proposal_idProposal`,`Sheet_idSheet`,`TalentArea_idTalentArea`)VALUES(NULL,?,NULL,?,NULL);"
            let arrayList = []
            for(let i = 0 ; i<params.keywords.split(",").length; i++){
                arrayList.push(params.keywords.split(",")[i]);
                arrayList.push(idSheet);
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
                    res.status(200).send({error:false,idSheet:idSheet});
                    next();
                }
            
            });
        }    
    });
}
module.exports = postCreateSheet; 