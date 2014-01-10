angular.module('childSupportApp')
  .factory('Session', ['$log', '$location', '$http', '$q',
    function($log, $location, $http, $q) {
      'use strict';

      function redirect(url) {
        url = url || '/';
        $log.info('Redirecting to: ' + url);
        $location.path(url);
      }

      var service = {
        signIn: function(email, password) {
          var deferred = $q.defer();

          $http.post('/users/sign_in', {
            user: {
              email: email,
              password: password
            }
          })
            .success(function(response) {
              console.log(response);
              service.currentUser = response.data.currentUser;
              deferred.resolve(response);
            })
            .error(function(error) {
              $log.error('could not log user in ' + error);
            });

          return deferred.promise;
        },
        signOut: function(redirectTo) {
          $http.delete('/users/sign_out')
            .success(function() {
              service.currentUser = null;
              redirect(redirectTo);
            });
        },
        register: function(email, password, confirmPassword) {
          var deferred = $q.defer();
          $http.post('/users.json', {
            user: {
              email: email,
              password: password,
              password_confirmation: confirmPassword
            }
          })
            .success(function(data) {
              deferred.resolve(data);
            })
            .error(function(error) {
              $log.error('Could not register user ' + error);
              deferred.reject(error);
            });

          return deferred.promise;
        },
        requestCurrentUser: function() {
          var deferred = $q.defer();
          if (service.isAuthenticated()) {
            deferred.resolve(service.currentUser);
          } else {
            $http.get('/users/current_user')
              .success(function(response) {
                service.currentUser = response.data.currentUser;
                deferred.resolve(service.currentUser);
              })
              .error(function(error) {
                $log.error('Could not get current user ' + error);
                deferred.reject(error);
              });
          }
          return deferred.promise;
        },
        isAuthenticated: function() {
          return !!service.currentUser;
        }
      };

      return service;
    }
  ]);