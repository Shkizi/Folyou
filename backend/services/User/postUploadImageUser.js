var db = require('../dbconnect.js');



function postUploadImageUser(req, res, next, upload, multer) {
    let params = req.body;
    
    let name = req.file.filename;
    db.query("UPDATE `folyou`.`anexes` SET `fileName` = ? WHERE `idAnexes` = ?;", [name,params.idUser], function (rows, error) {
        if (error) {
            res.send({
                error: true,
                err: "Error",
                errorObj: error,
                rows: rows
            });
        } else {
            res.status(200).send({
                error: false
            });
            next();
        }


    });
}
module.exports = postUploadImageUser;