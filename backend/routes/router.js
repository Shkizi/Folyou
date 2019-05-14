function router(app, express) {
    const servicer = require("../services/servicer.js");


app.get("/getUserById", (req, res,next) => {  servicer.getUserById(req,res,next)});
app.get("/getUsers", (req, res,next) => {  servicer.getUsers(req,res,next)});

app.get("/getPortfolioById", (req, res,next) => {  servicer.getPortfolioById(req,res,next)});
app.get("/getPortfolioByIdRecent", (req, res,next) => {  servicer.getPortfolioByIdRecent(req,res,next)});
app.get("/getPortfolioByIdUser", (req, res,next) => {  servicer.getPortfolioByIdUser(req,res,next)});
app.get("/getProposalByIdRecent", (req, res,next) => {  servicer.getProposalByIdRecent(req,res,next)});
app.get("/getProposalByIdUser", (req, res,next) => {  servicer.getProposalByIdUser(req,res,next)});

app.get("/getProposalByIdProposal", (req, res,next) => {  servicer.getProposalByIdProposal(req,res,next)});

app.get("/getTalentByIdRecent", (req, res,next) => {  servicer.getTalentByIdRecent(req,res,next)});
app.get("/getTalentByIdUser", (req, res,next) => {  servicer.getTalentByIdUser(req,res,next)});

app.get("/getKeywords", (req, res,next) => {  servicer.getKeywords(req,res,next)});




}
module.exports.router = router;