angular.module('childSupportApp')
  .controller('SignInCtrl', ['$log', 'NavInfo',
    function($log, NavInfo) {
      'use strict';
      NavInfo.title = 'Sign In';
      NavInfo.backReference = '#/';
    }
  ]);