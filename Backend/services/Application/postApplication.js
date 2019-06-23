var db = require('../dbconnect.js');



function postApplication(req, res, next) {
    let params = req.body;
    let query1 ="call createApplication(?);"
    params.data=JSON.parse(params.data);
    db.query(query1,[params.data.description], function (rows, error) {
        if (error) {
            res.send({
                error: true,
                err: "Error",
                errorObj:error,
                rows:rows
            });
            next();
        } else {
            console.log(rows);
            
            let idApplication = rows[0][0].insertedId;

            let query = "INSERT INTO `folyou`.`application`(`idApplication`,`Proposal_idProposal`,`ApplicationTeam_idApplicationTeam`,`ApplicationState_idApplicationState`)VALUES(null,?,?,1);";
            let query2 = "INSERT INTO `folyou`.`applicationteamuser`(`idApplicationTeamUser`,`User_idUser`,`ApplicationTeam_idApplicationTeam`)VALUES(null,?,?);";
            db.query(query,[parseInt(params.idProposal),parseInt(idApplication)], function (rows, error) {
                if (error) {
                    res.send({
                        error: true,
                        err: "Error",
                        errorObj:error,
                        rows:rows
                    });
                    next();
                } else {
                    let arraylist = [];
                   
                    arraylist.push(parseInt(params.idUser));
                    arraylist.push(parseInt(idApplication));
                   if( params.isIndividual == false){
                        for( let i = 0; i< params.data.numberOfPeople;i++){
                            arraylist.push(parseInt(params.data.users[params.data.teamPeople[i]].idUser));
                            arraylist.push(parseInt(idApplication));
                        }
                    }else{
                        params.data.numberOfPeople=0;
                    }
                    db.query(query2.repeat(params.data.numberOfPeople+1),arraylist, function (rows, error) {
                        if (error) {
                            res.send({
                                error: true,
                                err: "Error",
                                errorObj:error,
                                rows:rows
                            });
                            next();
                        } else {
                            res.send({
                                error: false,                                
                                rows:rows
                            });
                            next();
                        }
                    
                    });
                
                }
            
            });

            
        }
    
    });
}
module.exports = postApplication;