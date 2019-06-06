var db = require('../dbconnect.js');

function getRecomendBoolFromIds(req, res,next) {
    let params=req.query;
   
    db.query("SELECT count(*) as \"kk\" FROM folyou.recomendation WHERE User_idUser=? AND User_idUser1 = ?;", [params.idUser,params.idUser1], function (rows, error) {
          
        if(error){
                res.send({error: true, err: error});
        }else{
            res.send({error: false, answer: rows[0].kk>0});     
            next();
        }
    });
}
module.exports = getRecomendBoolFromIds;