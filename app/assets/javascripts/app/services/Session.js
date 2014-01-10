angular.module('childSupportApp')
  .factory('Session', ['$log', '$location', '$http', '$q',
    function($log, $location, $http, $q) {
      'use strict';

      var _this;

      function redirect(url) {
        url = url || '/';
        $log.info('Redirecting to: ' + url);
        $location.path(url);
      }

      function Session() {
        _this = this;
        $log.info('initializing sessions service');
      }
      Session.prototype.currentUser = null;
      Session.prototype.signIn = function(email, password) {
        var deferred = $q.defer();

        $http.post('/users/sign_in', {
          user: {
            email: email,
            password: password
          }
        })
          .success(function(response) {
            console.log(response);
            _this.currentUser = response.user;
            deferred.resolve(response);
          })
          .error(function(error) {
            $log.error('could not log user in ' + error);
          });

        return deferred.promise;
      };
      Session.prototype.signOut = function(redirectTo) {
        $http.delete('/users/sign_out')
          .success(function() {
            _this.currentUser = null;
            redirect(redirectTo);
          });
      };
      Session.prototype.register = function(email, password, confirmPassword) {
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
      };
      Session.prototype.requestCurrentUser = function() {
        var deferred = $q.defer();
        if (this.isAuthenticated()) {
          deferred.resolve(this.currentUser);
        } else {
          $http.get('/users/current_user')
            .success(function(response) {
              _this.currentUser = response.user;
              deferred.resolve(_this.currentUser);
            })
            .error(function(error) {
              $log.error('Could not get current user ' + error);
              deferred.reject(error);
            });
        }
        return deferred.promise;
      };
      Session.prototype.isAuthenticated = function() {
        return !!this.currentUser;
      };

      return new Session();
    }
  ]);
