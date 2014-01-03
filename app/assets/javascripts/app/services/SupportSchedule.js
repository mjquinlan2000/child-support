angular.module('childSupportApp')
  .factory('SupportSchedule', ['$http', '$log', '$q',
    function($http, $log, $q) {
      var deferred = $q.defer();

      $http.get('/api/support_schedule.json')
        .success(function(schedule) {
          deferred.resolve(schedule);
        })
        .error(function(error) {
          deffered.reject(error);
        });

      return deferred.promise;
    }
  ]);