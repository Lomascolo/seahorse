'use strict';


export default class ApiBaseClass {
  constructor($http, config) {
    'ngInject';

    this.$http = $http;
    this.apiUrl = `${config.apiHost}:${config.apiPort}`;
    this.servicePath = '';
  }


  get serviceUrl() {
    return `${this.apiUrl}${this.servicePath}`;
  }


  getData(result) {
    return result.data;
  }


  makeEndpointUrl(endpointPath = '') {
    return `${this.serviceUrl}${endpointPath}`;
  }
}