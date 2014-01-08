angular.module('childSupportApp', ['ngRoute', 'ngSanitize'])
  .config(['$routeProvider',
    function($routeProvider) {
      'use strict';

      $routeProvider
        .when('/', {
          controller: 'HomeCtrl',
          templateUrl: 'pages/home_template.html'
        })
        .when('/clients/:id', {
          controller: 'ClientEditCtrl',
          templateUrl: 'pages/edit_client_template.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ])
  .value('NavInfo', {});
