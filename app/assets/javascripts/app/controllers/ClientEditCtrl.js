angular.module('childSupportApp')
  .controller('ClientEditCtrl', function($scope, $timeout, $routeParams, $location, $log, Client, Gender, ClientRecord, RecordType) {
    $scope.recordTimeouts = {};
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
      ClientRecord.newClientRecord($scope.client.id, {
        amount: 0
      }).then(function(newRecord){
        $scope.client_records.push(newRecord);
      })
    };

    $scope.onClientChanged = function(){
      $timeout.cancel($scope.clientTimeout);
      $scope.clientTimeout = $timeout(function(){
        Client.updateClient($scope.client);
      }, 3000);
    };

    $scope.onClientRecordChanged = function(record){
      $timeout.cancel($scope.recordTimeouts[record.id]);
      $scope.recordTimeouts[record.id] = $timeout(function(){
        ClientRecord.updateClientRecord($scope.client.id, record);
      }, 3000);
    };
  });