'use strict';

/* @ngInject */
function BaseApiClientFactory($http, $q, config) {

  function BaseApiClient() {}

  BaseApiClient.prototype.API_URL = config.apiPort ?
    `${config.apiHost}:${config.apiPort}/${config.urlApiVersion}` :
    `${config.apiHost}/${config.urlApiVersion}`;

  BaseApiClient.prototype.METHOD_GET = 'GET';
  BaseApiClient.prototype.METHOD_POST = 'POST';
  BaseApiClient.prototype.METHOD_PUT = 'PUT';
  BaseApiClient.prototype.METHOD_DELETE = 'DELETE';

  BaseApiClient.prototype.makeRequest = function(method, url, data = {}, timeout) {
    let deferred = $q.defer();
    $http({
        'method': method,
        'url': url,
        'data': data,
        'timeout': timeout
      })
      .then((result) => {
        deferred.resolve(result.data);
      }, (error) => {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  return BaseApiClient;
}

exports.inject = function(module) {
  module.factory('BaseApiClient', BaseApiClientFactory);
};