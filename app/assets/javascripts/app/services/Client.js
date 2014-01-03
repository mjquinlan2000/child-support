'use strict';

angular.module('childSupportApp')
  .factory('Client', ['$http', '$q', '$log',
    function($http, $q, $log) {
      return {
        all: function() {
          var deferred = $q.defer();
          $http.get('api/clients.json')
            .success(function(data) {
              deferred.resolve(data);
            }).error(function(error) {
              deferred.reject(error);
            });

          return deferred.promise;
        },

        getClient: function(clientId) {
          var deferred = $q.defer();

          $http.get('api/clients/' + clientId + '.json')
            .success(function(data) {
              deferred.resolve(data);
            })
            .error(function(error) {
              deferred.reject(error);
            });

          return deferred.promise;
        },

        newClient: function(params) {
          var deferred = $q.defer();
          $http.post('api/clients', params)
            .success(function(data) {
              deferred.resolve(data);
            })
            .error(function(error) {
              deferred.reject(error);
            });

          return deferred.promise;
        },

        updateClient: function(params) {
          var deferred = $q.defer();

          $http.put('api/clients/' + params.id, params)
            .success(function(data) {
              $log.info('Client updated successfully!');
            })
            .error(function(error) {
              $log.error(JSON.stringify(error));
            });

          return deferred.promise;
        }
      };
    }
  ]);