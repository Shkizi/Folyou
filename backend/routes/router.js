function router(app, express) {
    const servicer = require("../services/servicer.js");


app.get("/getUserById", (req, res) => {  servicer.getUserById(req,res)});




}
module.exports.router = router;