function router(app, express) {
    const servicer = require("../services/servicer.js");


app.get("/getUser", (req, res) => {  servicer.getUser(req,res)});




}
module.exports.router = router;