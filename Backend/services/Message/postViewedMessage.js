var db = require('../dbconnect.js');



function postViewedMessage(req, res,next,upload,multer) {
    let params = req.body;
    

            let query = "UPDATE `folyou`.`message` SET `viewed` = 1 WHERE `idMessage` = ? ;"
            let arrayList = [params.idMessage]
          
            console.log(arrayList);
            db.query(query,arrayList, function (rows, error) {
                if (error) {
                    res.send({
                        error: true,
                        err: "Error",
                        errorObj:error,
                        rows:rows
                    });
                    next();
                } else {
                    res.status(200).send({error:false});
                    next();
                }
            
            });
     
}
module.exports = postViewedMessage; 