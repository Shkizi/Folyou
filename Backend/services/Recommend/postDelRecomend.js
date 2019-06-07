var db = require('../dbconnect.js');

function postDelRecomend(req, res,next) {
    let params=req.body;
   console.log(params,"DELETE");
    db.query("CALL deleteRecomendation(?,?)", [params.idUser,params.idUser1], function (rows, error) {
          
        if(error){
                res.send({error: true, err: error});
        }else{
            res.send({error: false});     
            next();
        }
    });
}
module.exports = postDelRecomend;