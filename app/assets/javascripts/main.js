angular.module('childSupportApp', ['ngRoute', 'ngSanitize', 'ngResource'])
  .config(['$httpProvider',
    function($httpProvider) {
      'use strict';

      $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

      var interceptor = ['$location', '$rootScope', '$q',
        function($location, $rootScope, $q) {
          function success(response) {
            return response;
          }

          function error(response) {
            if (response.status === 401) {
              console.log('401 bitches');
              $rootScope.$broadcast('event:unauthorized');
              $location.path('/users/sign_in');
              return $q.reject(response);
            }
            return $q.reject(response);
          }

          return function(promise) {
            return promise.then(success, error);
          };
        }
      ];
      $httpProvider.responseInterceptors.push(interceptor);
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
        .when('/users/sign_in', {
          templateUrl: '/pages/sign_in_template.html',
          controller: 'UsersCtrl'
        })
        .when('/users/register', {
          templateUrl: '/pages/sign_up.html',
          controller: 'UsersCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ])
  .value('NavInfo', {});
