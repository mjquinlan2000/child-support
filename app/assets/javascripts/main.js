angular.module('childSupportApp', ['ngRoute', 'ngSanitize'])
  .config(function($routeProvider){
    $routeProvider
      .when('/', {controller: 'HomeCtrl', templateUrl: 'pages/home_template.html'});
  })