function router(app, express) {
    const servicer = require("../services/servicer.js");


app.get("/getUserById", (req, res,next) => {  servicer.getUserById(req,res,next)});
app.get("/getPortfolioById", (req, res,next) => {  servicer.getPortfolioById(req,res,next)});





}
module.exports.router = router;