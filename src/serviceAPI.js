import axios from 'axios';

export default class ServicesAPI {

  serviceAPI() {
    return axios.create({
      baseURL: this.baseURL()
    });
  }
baseURL(){
  return `http://localhost:5500/`;
}
  getter(url,params,callback,callbackerr) {
      this.serviceAPI().get(url, {
      params: params
    }).then(res => {
     callback(res);
  }).catch((error) => {
    const errore=error;
    callbackerr(errore);
  }); 
  }
  poster(url,params,callback,callbackerr) {
    this.serviceAPI().post(url, {
    params: params
  }).then(res => {
   callback(res);
}).catch((error) => {
  const errore=error;
  callbackerr(errore);
}); 
}

putter(url,params,callback,callbackerr) {
  this.serviceAPI().put(url, {
  params: params
}).then(res => {
 callback(res);
}).catch((error) => {
const errore=error;
callbackerr(errore);
}); 
}

deleter(url,params,callback,callbackerr) {
  this.serviceAPI().delete(url, {
  params: params
}).then(res => {
 callback(res);
}).catch((error) => {
const errore=error;
callbackerr(errore);
}); 
}
  
}