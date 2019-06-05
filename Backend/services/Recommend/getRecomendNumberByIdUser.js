var db = require('../dbconnect.js');

function getRecomendNumberByIdUser(req, res,next) {
    let params=req.query;
   
    db.query("SELECT count(*) as \"kk\" FROM folyou.recomendation WHERE User_idUser=?;", [params.idUser], function (rows, error) {
          
        if(error){
                res.send({error: true, err: error});
        }else{
            res.send({error: false, number: rows[0].kk});     
            next();
        }
    });
}
module.exports = getRecomendNumberByIdUser;