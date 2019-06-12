var db = require('../dbconnect.js');



function postMessage(req, res,next,upload,multer) {
    let params = req.body;
    

            let query = "INSERT INTO `folyou`.`message`(`idMessage`,`viewed`,`valueText`,`User_idUser`,`User_idUser1`)VALUES(NULL,0,?,?,?);"
            let arrayList = [params.text,params.maker, params.recetor]
          
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
module.exports = postMessage; 