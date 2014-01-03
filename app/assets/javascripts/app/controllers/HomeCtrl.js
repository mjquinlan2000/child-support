angular.module('childSupportApp')
  .controller('HomeCtrl', ['$scope', '$location', '$log', 'Client',
    function($scope, $location, $log, Client) {
      $scope.clients = [];

      Client.all()
        .then(function(data) {
          $scope.clients = data;
        });

      $scope.addNewClient = function() {
        Client.newClient({
          name: ''
        }).then(function(newClient) {
          $location.path('/clients/' + newClient.id);
        });
      };
    }
  ]);