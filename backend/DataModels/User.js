class User {
    
    constructor(idUser,nameUser,emailUser,passwordUser,isAdmin,countryUser,regionUser,addressUser,languageUser,isActivated,createdTimestamp){
        this.roles=this.getArrayOfRoles(isAdmin);
        this.idUser = idUser;
        this.nameUser = nameUser;
        this.emailUser = emailUser;
        this.passwordUser = passwordUser;
        this.isAdmin = isAdmin;
        this.countryUser = countryUser;
        this.regionUser = regionUser;
        this.addressUser = addressUser;
        this.languageUser = languageUser;
        this.isActivated = isActivated;
        this.createdTimestamp = createdTimestamp;
        this.toString=this.toString;
      
    }

        
    toString(){
        return "Object.User:{"+
        this.idUser+","+
        this.nameUser+","+
        this.emailUser+","+
        this.passwordUser+","+
        this.isAdmin+","+
        this.countryUser+","+
        this.regionUser+","+
        this.addressUser+","+
        this.languageUser+","+
        this.isActivated +","+
        this.createdTimestamp+","+
        this.roles + "}";
    }
    getArrayOfRoles(isAdmin){
        var roles=[];
        if(isAdmin){
            roles[1]="Admin";
        }
        roles[0]="User";
        return roles;
    }
}

module.exports=User;