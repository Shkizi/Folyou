function router(app, express) {
    const servicer = require("../services/servicer.js");


app.get("/getUserById", (req, res,next) => {  servicer.getUserById(req,res,next)});




}
module.exports.router = router;