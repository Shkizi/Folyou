var db = require('../dbconnect.js');



function getKeywords(req, res, next) {
    let params = req.query;


             db.query("SELECT DISTINCT valueProposalKeywords FROM `Keyword`; ",[], function (rowsKeywords, errorkey) {
                     if (errorkey && rowsKeywords == null) {
                         res.send({
                            error: true,
                            err: "Keyword Error",
                            errorObj:errorkey,
                            rows:rowsKeywords
                        });
                    } else {
                        console.log(rowsKeywords);
                        let keywords=[];
                        rowsKeywords.forEach(element => {
                            keywords.push(element.valueProposalKeywords);
                        });
                        res.send({
                            error: false,
                            keywords: keywords
                        });
                        next();
                    }
                
            });
}
module.exports = getKeywords;