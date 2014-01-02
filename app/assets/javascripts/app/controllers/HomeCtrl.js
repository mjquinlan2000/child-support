angular.module('childSupportApp')
  .controller('HomeCtrl', function($scope, $location, $log, Client){
    $scope.clients = [];

    Client.all()
      .then(function(data){
        $scope.clients = data;
      });

    $scope.addNewClient = function(){
      $location.path('/clients/new');
    };
  });