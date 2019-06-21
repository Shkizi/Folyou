var db = require('../dbconnect.js');
var crypto = require('crypto');

function postCreateUser(req, res, next) {
    let params = req.body;
    let query1 = "call createUser (?,?,?,?,?,'pt',?);"
    console.log(params, "This is the Create User");

    db.query(query1, [
        params.nameUser,
        params.emailUser,
        crypto.createHash('sha256').update(params.passwordUser).digest('hex'),
        params.countryUser.toLowerCase(),
        params.regionUser,
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