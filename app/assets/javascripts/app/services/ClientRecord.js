angular.module('childSupportApp')
  .factory('ClientRecord', ['$log', '$http', '$q',
    function($log, $http, $q) {
      return {
        getByClientId: function(clientId) {
          var deferred = $q.defer();
          $http.get('/api/clients/' + clientId + '/client_records.json')
            .success(function(data) {
              deferred.resolve(data);
            })
            .error(function(error) {
              deferred.reject(error);
            });
          return deferred.promise;
        },
        newClientRecord: function(clientId, params) {
          var deferred = $q.defer();
          $http.post('/api/clients/' + clientId + '/client_records', params)
            .success(function(data) {
              deferred.resolve(data);
            })
            .error(function(error) {
              deferred.reject(error);
            });

          return deferred.promise;
        },
        updateClientRecord: function(clientId, params) {
          var deferred = $q.defer();

          $http.put('/api/clients/' + clientId + '/client_records/' + params.id, params)
            .success(function(data) {
              deferred.resolve(data);
            })
            .error(function(error) {
              deferred.reject(error);
            });

          return deferred.promise;
        }
      };
    }
  ]);