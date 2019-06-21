var User = require("../../DataModels/User.js");
var db = require('../dbconnect.js');
var crypto = require('crypto');


//gets a user by its email and hashed password with sha256
//example: localhost:5500/getUser?emailUser=andre@outlook.pt
// for password use  var hash = crypto.createHash('sha256').update(params.passwordUser).digest('hex');
function getPortfolioById(req, res, next) {
    let params = req.query;
    let arr=[];
    if(!params.hasOwnProperty("idSheet")){
        params["idSheet"]="";
    }
    if(!params.hasOwnProperty("country")){
        params["country"]="";
    }
    if(params.country!=""){
        arr.push(params.country);
    }
    if(params.idSheet!=""){
        arr.push(parseInt(params.idSheet));
    }

if(params.keywords!=null){
    
}
    db.query("SELECT * FROM `Sheet`,`Portfolio`, `Category`, `User`,(SELECT filename as `avatarUser`, User_idUser from Anexes) as avatar   WHERE `Category`.`idCategory` =`Sheet`.`Category_idCategory`"+
    " AND `User`.`idUser` = avatar.User_idUser AND `User`.`idUser` = `Portfolio`.`User_idUser` "+
    
    "AND `Sheet`.`idSheet` = `Portfolio`.`Sheet_idSheet` "+ ((params.country!="")?" AND countrySheet LIKE ? ":"")+
    ((params.idSheet!="")?" AND idSheet = ? ":"")+
    "ORDER BY `Sheet`.`createdTimestamp`",arr, function (rows, error) {
        if (!error) {
            console.log(rows);
             db.query("SELECT * FROM `Keyword`; ",[], function (rowsKeywords, errorkey) {
                     if (errorkey && rowsKeywords == null) {
                         res.send({
                            error: true,
                            err: "Keyword Error",
                            errorObj:error,
                             rows:rows
                        });
                    } else {
                        rows.forEach((valuePort,indexPort,arrayPort)=>{   rows[indexPort].keywords=[]; });
                        rows.forEach((valuePort,indexPort,arrayPort)=>{    
                            rowsKeywords.forEach((value, index, array)=> {
                                if(rows[indexPort].idSheet==rowsKeywords[index].Sheet_idSheet){
                                    rows[indexPort].keywords.push(rowsKeywords[index].valueProposalKeywords);
                                }
                               
                            });
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
                            portfolioList: rows
                        });

                        next();
                    }
                
            });
        } else {
            res.send({
                error: true,
                err: "Sheet Error",
                errorObj:error,
                rows:rows
            });
            
        }
    });
}
module.exports = getPortfolioById;