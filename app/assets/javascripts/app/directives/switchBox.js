angular.module('childSupportApp')
  .directive('switchBox', function(){
    'use strict';

    return {
      restrict: 'A',
      link: function(scope, elem, attrs){
        elem.switchButton({
          show_labels: false,
          width: 40,
          height: 32,
          button_width: 20
        });
      }
    };
  });