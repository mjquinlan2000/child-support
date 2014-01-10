angular.module('childSupportApp')
  .controller('UsersCtrl', ['$log', '$scope', 'NavInfo', 'Session',
    function($log, $scope, NavInfo, Session) {
      'use strict';

      window.sess = Session;
      NavInfo.title = 'Log In';
      NavInfo.backReference = '#/';

      $scope.signIn = function() {
        Session.signIn($scope.user.email, $scope.user.password);
      };
    }
  ]);
