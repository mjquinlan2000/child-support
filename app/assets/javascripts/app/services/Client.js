'use strict';

angular.module('childSupportApp')
  .factory('Client', function($http, $q, $log){
    return {
      all: function(){
        var deferred = $q.defer();
        $http.get('api/clients.json')
          .success(function(data){
            deferred.resolve(data);
          }).error(function(error){
            deferred.reject(error);
          });

        return deferred.promise;
      },

      getClient: function(clientId){
        var deferred = $q.defer();

        $http.get('api/clients/'+clientId+'.json')
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