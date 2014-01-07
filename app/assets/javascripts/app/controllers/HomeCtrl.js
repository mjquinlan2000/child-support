angular.module('childSupportApp')
  .controller('HomeCtrl', ['$scope', '$location', '$log', 'Client', 'BackReferenceService',
    function($scope, $location, $log, Client, BackReferenceService) {
      'use strict';

      $scope.clients = [];

      BackReferenceService.backReference = null;

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
