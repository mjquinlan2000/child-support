angular.module('childSupportApp')
  .controller('ClientsCtrl', ['$scope', '$location', '$log', 'Client', 'NavInfo',
    function($scope, $location, $log, Client, NavInfo) {
      'use strict';
      NavInfo.title = 'Your Clients';
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

      $scope.deleteClient = function(client){
        Client.destroyClient(client.id).then(function(){
          $log.info('client deleted successfully!')
          $scope.clients = _.reject($scope.clients, function(existing){
            return existing.id == client.id;
          });
        });

      };
    }
  ]);
