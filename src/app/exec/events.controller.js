'use strict';
angular.module('app')
.controller('ExecEventsController', ['$rootScope', '$scope', 'ApiRest','ngToast', 'urls','$state',
 function ($rootScope, $scope,  ApiRest,ngToast, urls, $state) {
  ApiRest.one('events').get().then(function(data) {
      $scope.events = data;
    });
   $scope.save = function(index, event_id) {
   	// raw JS because FISI
   	var begin = document.getElementsByName('begin-' + index)[0].value;
   	var end = document.getElementsByName('end-' + index)[0].value;
   	var description = document.getElementsByName('description-' + index)[0].value;

    ApiRest.all('execs/events/' + event_id + '/update').post(
    	{
    		description: description,
    		begin: begin,
    		end: end,
    		event_id: event_id
    	}
    ).then(function(response) {
    	var content = response.message;
    	if(response.message === 'validation') {
    		content += '<br/>' + JSON.stringify(response.data)
    	}
    	document.getElementById("alert-" + index).innerHTML = content;
    	document.getElementById("alert-" + index).style.display = 'block';
    });
   	// console.log("clicked button with index " + index + " and event # " + event_id)
   	// console.log('begin: ' + begin + ', end: '+ end + ', description: ' + description)
   };
}]);
