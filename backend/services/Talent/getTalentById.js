var db = require('../dbconnect.js');


//gets a user by its email and hashed password with sha256
//example: localhost:5500/getUser?emailUser=andre@outlook.pt
// for password use  var hash = crypto.createHash('sha256').update(params.passwordUser).digest('hex');
function getTalentById(req, res, next) {
    let params = req.query;
    let arr=[];
    if(!params.hasOwnProperty("idTalentArea")){
        params["idTalentArea"]="";
    }
    if(!params.hasOwnProperty("country")){
        params["country"]="";
    }
    if(params.country!=""){
        arr.push(params.country);
    }
    if(params.idTalentArea!=""){
        arr.push(parseInt(params.idTalentArea));
    }
if(params.keywords!=null){
    
}
    db.query("SELECT * FROM `TalentArea`, `Category`, `User`,"+
    "(SELECT TalentArea_idTalentArea, GROUP_CONCAT(DISTINCT valueProposalKeywords) keywords "+
    "FROM keyword WHERE TalentArea_idTalentArea IS NOT NULL "+
   "GROUP BY TalentArea_idTalentArea ) AS keywords,(SELECT filename as `avatarUser`, User_idUser from Anexes) as avatar " +
    "  WHERE `Category`.`idCategory` =`TalentArea`.`Category_idCategory`"+
    " AND `User`.`idUser` = `TalentArea`.`User_idUser` AND `User`.`idUser` = avatar.User_idUser "+
    "AND  keywords.TalentArea_idTalentArea = idTalentArea "+  ((params.country!="")?" AND countryUser LIKE ? ":"")+
    ((params.idTalentArea!="")?" AND idTalentArea = ? ":"")+
    "ORDER BY `TalentArea`.`timestamp` ; ",arr , function (rows, error) {
        console.log(params);
        if (!error) {
            
            rows.forEach((valuePort,indexPort,arrayPort)=>{  
                rows[indexPort].keywordsString=rows[indexPort].keywords;
                 rows[indexPort].keywords=rows[indexPort].keywords.split(",");
                 });
            console.log(rows);
            if(params.keywords!=null){
                let del=[];
                rows.forEach((valuePort,indexPort,arrayPort)=>{  
                    params.keywords.forEach((value,index,array)=> {
                        if(!rows[indexPort].keywords.includes(value)){
                            del.push(indexPort);
                        }                             
                    });
                });
                for (var i = del.length -1; i >= 0; i--)
                        rows.splice(del[i],1);
            }
            res.send({
                error: false,
                talentList: rows
            });
            next();
        } else {
            res.send({
                error: true,
                err: "createdTimestamp Error",
                errorObj:error,
                rows:rows
            });
            
        }
    });
}
module.exports = getTalentById;