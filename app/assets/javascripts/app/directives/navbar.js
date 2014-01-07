angular.module('childSupportApp')
  .directive('navbar', function() {
    'use strict';

    return {
      restrict: 'E',
      scope: true,
      controller: ['$scope', 'BackReferenceService',
        function($scope, BackReferenceService) {
          $scope.referenceService = BackReferenceService;
          // $scope.$on('$locationChangeStart', function(event, newVal, oldVal){
          //   if($location.path() === '/' || ){
          //     BackReferenceService.backReference = null;
          //   } else {
          //     BackReferenceService.backReference = oldVal;
          //   }
          // });
        }
      ]
    };
  });