angular.module('childSupportApp')
  .controller('HomeCtrl', function($scope, $location, $log, Client){
    $scope.clients = [];

    Client.all()
      .then(function(data){
        $scope.clients = data;
      });

    $scope.addNewClient = function(){
      Client.newClient({
        name: ''
      }).then(function(newClient){
        $location.path('/clients/'+newClient.id);
      });
    };
  });