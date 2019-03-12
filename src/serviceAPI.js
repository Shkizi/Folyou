import axios from 'axios';

export default class ServicesAPI {

  serviceAPI() {
    return axios.create({
      baseURL: `http://localhost:5500/`
    });
  }

  getPortfoliosWithFilters(filters) {
    return this.serviceAPI().get(`getPortfoliosWithFilters`, {
      params: {
        filters: filters,
      }
    });
  }
  getNotificationsByUserId(idUser) {
    return this.serviceAPI().get(`getNotificationsByUserId`, {
      params: {
        idUser: idUser
      }
    })
  }
}