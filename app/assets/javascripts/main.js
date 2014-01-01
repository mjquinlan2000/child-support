angular.module('childSupportApp', ['ngRoute', 'ngSanitize'])
  .config(function($routeProvider){
    $routeProvider
      .when('/', {controller: 'HomeCtrl', template: '<h1>wut</h1>'})
  })