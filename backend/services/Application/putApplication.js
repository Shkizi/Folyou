var db = require('../dbconnect.js');



function putApplication(req, res, next) {
    let params = req.query;
    let query1 ="call createApplication(?);"
    db.query(query1,[params.description], function (rows, error) {
        if (error ) {
            res.send({
                error: true,
                err: "Error",
                errorObj:error,
                rows:rows
            });
            next();
        } else {
            console.log(rows);
            
            let idApplication = rows[0].insertedId;
            next();
        }
    
    });
}
module.exports = putApplication;