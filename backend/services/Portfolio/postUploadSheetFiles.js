var db = require('../dbconnect.js');



function postUploadSheetFiles(req, res, next) {
    let params = req.body;
     

    db.query("DELETE FROM `folyou`.`anexes` WHERE `Sheet_idSheet`=?;",[params.Sheet], function (rows, error) {
        if (error) {
            res.send({
                error: true,
                err: "Error",
                errorObj:error,
                rows:rows
            });
            next();
        } else {

            let query2 = "INSERT INTO `folyou`.`anexes`(`idAnexes`,`fileName`,`Proposal_idProposal`,`Sheet_idSheet`,`User_idUser`)VALUES(NULL,?,NULL,?,NULL);"
            let arrayList = []
            req.files.forEach((value,index,array)=>{
                arrayList.push(array[index].filename);
                arrayList.push(params.Sheet);
            });
            console.log(arrayList);
            db.query(query2.repeat(req.files.length), arrayList, function (rows, error) {

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
        }
    
    });
   
}
module.exports = postUploadSheetFiles; 