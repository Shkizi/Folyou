var User = require("../../DataModels/User.js");
var db = require('../dbconnect.js');
var crypto = require('crypto');


//gets a user by its email and hashed password with sha256
//example: localhost:5500/getUser?emailUser=andre@outlook.pt
// for password use  var hash = crypto.createHash('sha256').update(params.passwordUser).digest('hex');
function getProposalById(req, res, next) {
    let params = req.query;
    let arr=[];
if(!params.hasOwnProperty("idProposal")){
    params["idProposal"]="";
}
if(!params.hasOwnProperty("country")){
    params["country"]="";
}
if(params.country!=""){
    arr.push(params.country);
}
if(params.idProposal!=""){
    arr.push(parseInt(params.idProposal));
}
if(params.keywords!=null){
    
}
    db.query("SELECT * FROM `Proposal`, `Category`, `User`, "+
    "(SELECT Proposal_idProposal, GROUP_CONCAT(DISTINCT valueProposalKeywords) keywords"+
    " FROM keyword WHERE Proposal_idProposal IS NOT NULL "+
   "GROUP BY Proposal_idProposal ) AS keywords ,(SELECT filename as `avatarUser`, User_idUser from Anexes) as avatar  " +
    " WHERE `Category`.`idCategory` =`Proposal`.`Category_idCategory`"+
    " AND `User`.`idUser` = `Proposal`.`User_idUser` AND `User`.`idUser` = avatar.User_idUser "+
    "AND  keywords.Proposal_idProposal = idProposal "+ ((params.country!="")?" AND countryProposal LIKE ? ":"")+
    ((params.idProposal!="")?" AND idProposal = ? ":"")+
    "ORDER BY `Proposal`.`createdTimestamp`;",arr, function (rows, error) {
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
                                if(rows[indexPort].idProposal==rowsKeywords[index].Proposal_idProposal){
                                    rows[indexPort].keywords.push(rowsKeywords[index].valueProposalKeywords);
                                }
                               
                            });
                        });

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
                        console.log(rows);
                        res.send({
                            error: false,
                            proposalList: rows
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
module.exports = getProposalById;