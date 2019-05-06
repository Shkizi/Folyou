function router(app, express) {
    const servicer = require("../services/servicer.js");


app.get("/getUserById", (req, res,next) => {  servicer.getUserById(req,res,next)});
app.get("/getPortfolioById", (req, res,next) => {  servicer.getPortfolioById(req,res,next)});
app.get("/getPortfolioByIdRecent", (req, res,next) => {  servicer.getPortfolioByIdRecent(req,res,next)});
app.get("/getProposalByIdRecent", (req, res,next) => {  servicer.getProposalByIdRecent(req,res,next)});




}
module.exports.router = router;