angular.module('childSupportApp')
  .directive('clientTableEntry', function($log, $location, Client){
    return {
      restrict: 'A',
      scope: {
        client: '=clientTableEntry'
      },
      template:
        '<td>{{client.name}}</td>'+
        '<td>'+
          '<button class="pull-right btn edit-button">EDIT</button>'+
          '<button class="pull-right btn delete-button">DELETE</button>'+
        '</td>',
      controller: function($scope){

      },
      link: function(scope, elem, attrs){
        elem.find('.edit-button').click(function(){
          $location.path('//clients/'+scope.client.id);
        });

        elem.find('.delete-button').click(function(){
          Client.destroy(client.id)
            .then(function(data){
              $log.info('client deleted!');
            }, function(error){
              $log.error(JSON.stringify(error));
            });
        });
      }
    };
  });