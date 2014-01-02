angular.module('childSupportApp')
  .factory('Gender', function($http, $log, $q){
    var deferred = $q.defer();
    $http.get('/api/genders.json')
      .success(function(data){
        deferred.resolve(data);
      }).error(function(error){
        deferred.reject(error);
      });

    return deferred.promise;
  });