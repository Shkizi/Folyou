var multer = require('multer');
var db = require('../dbconnect.js');



function postCreateSheet(req, res, next) {
    let params = req.body;
    let idSheet = 0;
  console.log("Incor:",req);
    let name = Date.now() + '-' +params.imageName;
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/anexes/sheets')
        },
        filename: function (req, file, cb) {
               cb(null,name);    
        }
    });
    var upload = multer({ storage: storage }).single('file');
    db.query("CALL createSheet(?,?,?,?,?,?,?,?,?)",[params.nameProposal,params.sheetDescription,Date.now(),0,name,params.category,params.country,params.region,params.idUser], function (rows, error) {
        if (error) {
            res.send({
                error: true,
                err: "Error",
                errorObj:error,
                rows:rows
            });
        }
        else{
            idSheet = rows[0].insId;
            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json(err)
                } else if (err) {
                    return res.status(500).json(err)
                }
                res.status(200).send({error:false});
            });
        }
    });
    
   
}
module.exports = postCreateSheet; 