angular.module('childSupportApp')
  .directive('navbar', function() {
    'use strict';

    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'pages/navbar_template.html',
      controller: ['$scope', 'NavInfo',
        function($scope, NavInfo) {
          $scope.navInfo = NavInfo;

          $scope.$on('$locationChangeStart', function(){
            $scope.navInfo.backReference = null;
            $scope.navInfo.title = null;
          });
        }
      ]
    };
  });