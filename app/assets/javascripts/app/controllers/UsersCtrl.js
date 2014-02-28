angular.module('childSupportApp')
  .controller('UsersCtrl', ['$log', '$scope', '$location', 'NavInfo', 'Session',
    function($log, $scope, $location, NavInfo, Session) {
      'use strict';

      NavInfo.title = 'Log In';
      NavInfo.backReference = '#/';

      Session.requestCurrentUser().then(function(user){
        // $location.path('/clients');
      });

      $scope.signIn = function() {
        Session.signIn($scope.user.email, $scope.user.password)
          .then(function(){
            $location.path('/clients');
            $location.replace();
          });
      };

      $scope.signOut = function(){
        return Session.signOut();
      };
    }
  ]);
