angular.module('childSupportApp')
  .factory('RecordType', function($log, $http, $q){
    var deferred = $q.defer();

    $http.get('/api/record_types.json')
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(error){
        deferred.reject(error);
      });

    return deferred.promise;
  });