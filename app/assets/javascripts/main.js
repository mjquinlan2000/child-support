angular.module('childSupportApp', ['ngRoute', 'ngSanitize', 'ngResource'])
  .config(['$httpProvider',
    function($httpProvider) {
      'use strict';

      var authToken = $('meta[name="csrf-token"]').attr('content');
      $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken;
    }
  ])
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
