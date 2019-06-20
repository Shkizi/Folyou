var db = require('../dbconnect.js');



function postCreateUser(req, res, next) {
    let params = req.body;
    let query1 = "call createUser (?,?,?,?,?,?,?);"
    console.log(params, "This is the Create User");

    db.query(query1, [
        params.nameUser,
        params.emailUser,
        params.passwordUser,
        params.countryUser,
        params.regionUser,
        params.languageUser,
        params.descriptionUser
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
module.exports = postCreateUser;