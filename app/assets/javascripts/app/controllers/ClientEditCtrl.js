angular.module('childSupportApp')
  .controller('ClientEditCtrl', function($scope, $routeParams, $location, $log, Client, Gender) {
    Gender.then(function(data){
      $scope.genders = data;
    });
    if ($routeParams.id === 'new') {
      $scope.client = {};
    } else {
      Client.getClient($routeParams.id).then(function(data){
        $scope.client = data
      }, function(error){
        $log.error(JSON.stringify(error));
        $location.path('/clients/new');
      });
    }
  });