angular.module('childSupportApp')
  .controller('HomeCtrl', function($scope, $log, Client){
    $scope.clients = [];

    Client.all()
      .then(function(data){
        $scope.clients = data;
        console.log($scope.clients);
      });
  });