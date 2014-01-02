angular.module('childSupportApp')
  .controller('ClientEditCtrl', function($scope, $routeParams, $location, $log, Client, Gender, ClientRecord, RecordType) {
    Gender.then(function(data) {
      $scope.genders = data;
    });

    RecordType.then(function(data){
      $scope.record_types = data;
    });
    if ($routeParams.id === 'new') {
      $scope.client = {};
      $scope.client_records = [];
    } else {
      Client.getClient($routeParams.id).then(function(data) {
        $scope.client = data;
      }, function(error) {
        $log.error(JSON.stringify(error));
        $location.path('/clients/new');
      });

      ClientRecord.getByClientId($routeParams.id).then(function(records) {
        $scope.client_records = records;
      });
    }

    $scope.addClientRecord = function(){
      console.log('here');
      $scope.client_records.push({
        amount: 0
      });
    };
  });