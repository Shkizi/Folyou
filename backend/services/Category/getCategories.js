var db = require('../dbconnect.js');



function getCategories(req, res, next) {
    let params = req.query;


             db.query("SELECT * FROM `Category`; ",[], function (rowsKeywords, errorkey) {
                     if (errorkey && rowsKeywords == null) {
                         res.send({
                            error: true,
                            err: "Category Error",
                            errorObj:errorkey,
                            rows:rowsKeywords
                        });
                    } else {
                        console.log(rowsKeywords);
                        let categories=[];
                        rowsKeywords.forEach(element => {
                            categories.push(element);
                        });
                        res.send({
                            error: false,
                            categories: categories
                        });
                        next();
                    }
                
            });
}
module.exports = getCategories;