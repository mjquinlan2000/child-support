angular.module('childSupportApp')
  .factory('ClientRecord', function($log, $http, $q){
    return {
      getByClientId: function(clientId){
        var deferred = $q.defer();
        $http.get('/api/clients/'+clientId+'/client_records.json')
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(error){
            deferred.reject(error);
          });
        return deferred.promise;
      }
    };
  });