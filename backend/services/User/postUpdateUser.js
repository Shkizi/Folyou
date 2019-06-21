var db = require('../dbconnect.js');
var crypto = require('crypto');


function postUpdateUser(req, res, next) {
    let params = req.body;
    let query1 = "UPDATE `folyou`.`user` SET `nameUser` = ?, `countryUser` = ?, `regionUser` = ?, `descriptionUser` = ? "+((params.passwordUser=="")?"":", `passwordUser` = ?")+" WHERE `idUser` =?;"
    console.log(params, "This is the Update User");
let arr=[
    params.nameUser,
    params.countryUser.toLowerCase(),
    params.regionUser,
    params.descriptionUser
]
if(params.passwordUser!=""){arr.push(crypto.createHash('sha256').update(params.passwordUser).digest('hex'));}
arr.push(parseInt(params.idUser));

    db.query(query1, arr, function (rows, error) {
        if (error) {
            res.send({
                error: true,
                err: "Error",
                errorObj: error,
                rows: rows
            });
            next();
        } else {
            let query2 ="UPDATE `folyou`.`usermedia` SET            `idProfileGithub` = ?,            `idProfileStackOverflow` = ?,            `idProfileLinkedIn` = ?,            `idProfileYoutube` =  ?,            `idProfileFacebook` =  ?,            `idProfileTwitter` =  ?,            `idProfileInstagram` =  ?,            `idProfileTwitch` =  ?,            `linkedInOrganization` =  ?,            `linkedInRole` =  ?            WHERE `User_idUser` =  ?;            ";
            db.query(query2, [
                (params.idProfileGithub=="null")?'':params.idProfileGithub,
                (params.idProfileStackOverflow=="null")?'':params.idProfileStackOverflow,
                (params.idProfileLinkedIn=="null")?'':params.idProfileLinkedIn,
                (params.idProfileYoutube=="null")?'':params.idProfileYoutube,
                (params.idProfileFacebook=="null")?'':params.idProfileFacebook,
                (params.idProfileTwitter=="null")?'':params.idProfileTwitte,
                (params.idProfileInstagram=="null")?'':params.idProfileInstagram,
                (params.idProfileTwitch=="null")?'':params.idProfileTwitch,
                '',
                '',
                parseInt(params.idUser)
            ], function (rows, error) {
                if (error) {
                    res.send({
                        error: true,
                        err: "Error",
                        errorObj: error,
                        rows: rows
                    });
                    next();
                } else {
        
                    res.send({
                        error: false
                    });
                    next();
        
                }
        
            });

        }

    });

}
module.exports = postUpdateUser;