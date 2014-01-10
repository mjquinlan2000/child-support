angular.module('childSupportApp')
  .controller('ClientEditCtrl', ['$scope', '$timeout', '$routeParams', '$location', '$log', 'Client', 'Gender', 'ClientRecord', 'SupportSchedule', 'NavInfo', 'RecordType',
    function($scope, $timeout, $routeParams, $location, $log, Client, Gender, ClientRecord, SupportSchedule, NavInfo, RecordType) {
      'use strict';

      NavInfo.backReference = '#/';
      NavInfo.title = 'Editing';

      $scope.recordTimeouts = {};
      $scope.statuteYear = 2014;

      Gender.then(function(data) {
        $scope.genders = data;
      });

      RecordType.query(function(types){
        $scope.recordTypes = types;
      });

      Client.getClient($routeParams.id).then(function(data) {
        $scope.client = data;
        return ClientRecord.getByClientId($scope.client.id);
      })
      .then(function(records) {
        $scope.clientRecords = records;

        $scope.calculateChildSupport();
      });

      $scope.addClientRecord = function() {
        ClientRecord.newClientRecord($scope.client.id, {
          amount: 0
        }).then(function(newRecord) {
          $scope.clientRecords.push(newRecord);
        });
      };

      $scope.onClientChanged = function() {
        $scope.calculateChildSupport();
        $timeout.cancel($scope.clientTimeout);
        $scope.clientTimeout = $timeout(function() {
          Client.updateClient($scope.client);
        }, 3000);
      };

      $scope.onClientRecordChanged = function(record) {
        $timeout.cancel($scope.recordTimeouts[record.id]);
        $scope.recordTimeouts[record.id] = $timeout(function() {
          ClientRecord.updateClientRecord($scope.client.id, record);
        }, 3000);
        $scope.calculateChildSupport();
      };

      $scope.removeClientRecord = function(record){
        ClientRecord.deleteClientRecord($scope.client.id, record).then(function(){
          $scope.clientRecords = _.reject($scope.clientRecords, function(cr){
            return record.id === cr.id;
          });
          $scope.calculateChildSupport();
        });
      };

      $scope.useWorksheetB = function(){
        return $scope.client.overnights > 92 && $scope.client.overnights < 273;
      };

      $scope.calculateChildSupport = function() {
        var adjustedIncomeClient =
          $scope.client.income + $scope.client.maintenance_received - $scope.client.maintenance_paid;

        var adjustedIncomeSpouse =
          $scope.client.spouse_income - $scope.client.maintenance_received + $scope.client.maintenance_paid;

        var totalIncome = $scope.client.income + $scope.client.spouse_income;

        SupportSchedule.getByYear($scope.statuteYear).then(function(schedule) {
          var roundedIncome = parseInt(totalIncome / 50) * 50;
          if (roundedIncome < 1100) roundedIncome = 0;
          var numChildren = Math.min(6, $scope.client.children);
          var scheduleLow = parseInt(_.filter(schedule, function(entry) {
            return parseInt(entry.income) === roundedIncome;
          })[0][numChildren]);

          var scheduleHigh = parseInt(_.filter(schedule, function(entry) {
            return parseInt(entry.income) === roundedIncome + 50;
          })[0][numChildren]);

          var difference = scheduleHigh - scheduleLow;
          var newPayment = ((difference * (totalIncome - roundedIncome) / 50) + scheduleLow);
          if($scope.useWorksheetB()){
            newPayment *= 1.5;
          }
          var clientIncomePercent = adjustedIncomeClient / totalIncome;
          var spouseIncomePercent = 1 - clientIncomePercent;

          var clientSupportObligation = clientIncomePercent * newPayment;
          var spouseSupportObligation = spouseIncomePercent * newPayment;

          var clientOvernightPercent = $scope.client.overnights / 365;
          var spouseOvernightPercent = 1 - clientOvernightPercent;

          var clientObligationWithTime = spouseOvernightPercent * clientSupportObligation;
          var spouseObligationWithTime = clientOvernightPercent * spouseSupportObligation;

          var clientAdjustments = 0;
          var spouseAdjustments = 0;

          _.each($scope.clientRecords, function(record){
            if(record.is_subtracted){
              clientAdjustments += record.amount;
            } else {
              spouseAdjustments += record.amount;
            }
          });

          var totalAdjustments = clientAdjustments + spouseAdjustments;

          var clientAdjustedAmount = clientAdjustments * clientIncomePercent;
          var spouseAdjustedAmount = spouseAdjustments * spouseIncomePercent;

          var calculatedSupport;

          if($scope.useWorksheetB()){
            clientObligationWithTime -= Math.max(clientAdjustments - clientAdjustedAmount, 0);
            spouseObligationWithTime -= Math.max(spouseAdjustments - spouseAdjustedAmount, 0);
            calculatedSupport = spouseObligationWithTime - clientObligationWithTime;
          } else {
            clientObligationWithTime += Math.max(clientAdjustments - clientAdjustedAmount, 0);
            spouseObligationWithTime += Math.max(spouseAdjustments - spouseAdjustedAmount, 0);

            if($scope.client.overnights <= 92){
              calculatedSupport = -(clientObligationWithTime - clientAdjustments);
            } else {
              calculatedSupport = spouseObligationWithTime - spouseAdjustments;
            }
          }


          if (calculatedSupport < 0) {
            var prefix = 'Your client pays $';
          } else {
            var prefix = 'Your client receives $';
          }

          $scope.calculatedSupport = prefix + Math.abs(calculatedSupport).toFixed(2) + '/mo';
        });
      };
    }
  ]);
