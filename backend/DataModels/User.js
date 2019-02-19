class User {
    
    constructor(id,username,roles,rights){
        this.id=id;
        this.username=username;
        this.roles=roles;
        this.rights=rights;
    }
    getUserUsername(){
        return this.username;
    }
    getUserId(){
        return this.id;
    }
    getUserRoles(){
        return this.roles;
    }
    getUserRights(){
        return this.rights;
    }

    toString(){
        return "User["+ this.id + " , " + this.username + " , " + this.roles + " , " + this.rights + "]";
    }
}

module.exports=User;