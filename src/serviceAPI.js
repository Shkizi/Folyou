import axios from 'axios';

export default class ServicesAPI {

  serviceAPI() {
    return axios.create({
      baseURL: this.baseURL(),
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 10000,
      maxContentLength: 3000000,
    });
  }
baseURL(){
  return `http://localhost:5500/`;
}
  getter(url,params,callback,callbackerr) {
      this.serviceAPI().get(url, {params:params}).then(res => {
     callback(res);
  }).catch((error) => {
    const errore=error;
    callbackerr(errore);
  }); 
  }
  postter(url,params,callback,callbackerr) {
    this.serviceAPI().post(url, params).then(res => {
   callback(res);
}).catch((error) => {
  const errore=error;
  callbackerr(errore);
}); 
}

putter(url,params,callback,callbackerr) {
  this.serviceAPI().put(url, params).then(res => {
 callback(res);
}).catch((error) => {
const errore=error;
callbackerr(errore);
}); 
}

deleter(url,params,callback,callbackerr) {
  this.serviceAPI().delete(url, { data: params }).then(res => {
 callback(res);
}).catch((error) => {
const errore=error;
callbackerr(errore);
}); 
}
  
}