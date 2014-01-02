angular.module('childSupportApp')
  .controller('ClientEditCtrl', function($scope, $timeout, $routeParams, $location, $log, Client, Gender, ClientRecord, RecordType) {
    Gender.then(function(data) {
      $scope.genders = data;
    });

    RecordType.then(function(data){
      $scope.record_types = data;
    });

    Client.getClient($routeParams.id).then(function(data) {
      $scope.client = data;
    }, function(error) {
      $log.error(JSON.stringify(error));
      $location.path('/clients/new');
    });

    ClientRecord.getByClientId($routeParams.id).then(function(records) {
      $scope.client_records = records;
    });

    $scope.addClientRecord = function(){
      console.log('here');
      $scope.client_records.push({
        amount: 0
      });
    };

    $scope.onClientChanged = function(){
      $timeout.cancel($scope.clientTimeout);
      $scope.clientTimeout = $timeout(function(){
        Client.updateClient($scope.client);
      }, 5000);
    };
  });