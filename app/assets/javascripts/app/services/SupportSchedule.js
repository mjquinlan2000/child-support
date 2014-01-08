angular.module('childSupportApp')
  .factory('SupportSchedule', ['$http', '$log', '$q',
    function($http, $log, $q){
      'use strict';
      var years = [2014, 2013];
      var yearObjs = {};

      _.each(years, function(year){
        var deferred = $q.defer();
        $http.get('/api/support_schedule.json?year=' + year)
          .success(function(schedule) {
            deferred.resolve(schedule);
          })
          .error(function() {
            $log.error('Could not get schedule for year: ' + year);
          });
        yearObjs[year] = deferred.promise;
      });

      return {
        getByYear: function(year){
          return yearObjs[year];
        }
      };
    }
  ]);
