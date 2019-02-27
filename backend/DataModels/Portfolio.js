class Porfolio {
    
    constructor(id,idUser){
        this.id=id;
        this.idUser=idUser;
      
    }
    
    getUserId(){
        return this.idUser;
    }
    getPortfolioId(){
        return this.id;
    }

    toString(){
        
    }
}

module.exports=Porfolio;