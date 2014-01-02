angular.module('childSupportApp')
  .controller('ClientEditCtrl', function($scope, $timeout, $routeParams, $location, $log, Client, Gender, ClientRecord, RecordType, SupportSchedule) {
    $scope.recordTimeouts = {};
    Gender.then(function(data) {
      $scope.genders = data;
    });

    RecordType.then(function(data){
      $scope.record_types = data;
    });

    Client.getClient($routeParams.id).then(function(data) {
      $scope.client = data;
      $scope.calculateChildSupport();
    }, function(error) {
      $location.path('/');
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
      $scope.calculateChildSupport();
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

    $scope.calculateChildSupport = function(){
      var adjustedIncomeClient =
        $scope.client.income
        + $scope.client.maintenance_received
        - $scope.client.maintenance_paid;

      var adjustedIncomeSpouse =
        $scope.client.spouse_income
        - $scope.client.maintenance_received
        + $scope.client.maintenance_paid;

      var totalIncome = $scope.client.income + $scope.client.spouse_income;

      SupportSchedule.then(function(schedule){
        var roundedIncome = parseInt(totalIncome/50)*50;
        if(roundedIncome < 1100) roundedIncome = 0;
        var numChildren = Math.min(6, $scope.client.children);
        var scheduleLow = parseInt(_.filter(schedule, function(entry){
          return parseInt(entry.income) == roundedIncome;
        })[0][numChildren]);

        var scheduleHigh = parseInt(_.filter(schedule, function(entry){
          return parseInt(entry.income) == roundedIncome + 50;
        })[0][numChildren]);

        var difference = scheduleHigh - scheduleLow;
        var newPayment = (difference *(totalIncome - roundedIncome)/50)+scheduleLow;
        var clientIncomePercent = adjustedIncomeClient/totalIncome;
        var spouseIncomePercent = 1 - clientIncomePercent;

        var clientSupportObligation = clientIncomePercent * newPayment;
        var spouseSupportObligation = spouseIncomePercent * newPayment;

        var clientOvernightPercent = $scope.client.overnights/365;
        var spouseOvernightPercent = 1 - clientOvernightPercent;

        var clientObligationWithTime = spouseOvernightPercent * clientSupportObligation;
        var spouseObligationWithTime = clientOvernightPercent * spouseSupportObligation;

        $scope.calculatedSupport = spouseObligationWithTime - clientObligationWithTime;
      });
    };
  });