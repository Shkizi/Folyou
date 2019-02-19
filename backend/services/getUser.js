var User = require("../DataModels/User.js");
function getUser(req, res){
let user = new User(1,"André",['user'], ['can_view_articles']);

res.send(user);

}
module.exports = getUser;
