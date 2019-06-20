var db = require('../dbconnect.js');



function postUpdateUser(req, res, next) {
    let params = req.body;
    let query1 = "UPDATE `folyou`.`user` SET `nameUser` = ?, `countryUser` = ?, `regionUser` = ?, `descriptionUser` = ? WHERE `idUser` =?;"
    console.log(params, "This is the Update User");

    db.query(query1, [
        params.nameUser,
        params.countryUser,
        params.regionUser,
        params.descriptionUser,
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
            let query2 ="UPDATE `folyou`.`usermedia` SET            `idProfileGithub` = ?,            `idProfileStackOverflow` = ?,            `idProfileLinkedIn` = ?,            `idProfileYoutube` =  ?,            `idProfileFacebook` =  ?,            `idProfileTwitter` =  ?,            `idProfileInstagram` =  ?,            `idProfileTwitch` =  ?,            `linkedInOrganization` =  ?,            `linkedInRole` =  ?            WHERE `User_idUser` =  ?;            ";
            db.query(query2, [
                params.idProfileGithub,
                params.idProfileStackOverflow,
                params.idProfileLinkedIn,
                params.idProfileYoutube,
                params.idProfileFacebook,
                params.idProfileTwitter,
                params.idProfileInstagram,
                params.idProfileTwitch,
                params.linkedInOrganization,
                params.linkedInRole,
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