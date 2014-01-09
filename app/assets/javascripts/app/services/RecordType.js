angular.module('childSupportApp')
  .factory('RecordType', ['$log', '$resource',
    function($log, $resource) {
      'use strict';
      return $resource('/api/record_types/:id.json', {
        id: '@id'
      });
    }
  ]);
