class User {
    
    constructor(id,username,roles,email,passwordHash,country,language){
        this.id=id;
        this.username=username;
        this.roles=roles;
        this.email=email;
        this.passwordHash=passwordHash;
        this.country=country;
        this.language=language;
      
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

    getEmail(){
        return this.email;
    }

    getPasswordHash(){
        return this.passwordHash;
    }

    getCountry(){
        return this.country;
    }

    getLanguage(){
        return this.language;
    }

    toString(){
        return "User["+ this.id + " , " + this.username + " , " + this.roles + "]";
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