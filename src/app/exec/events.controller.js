'use strict';
angular.module('app')
 .controller('ExecEventsController', ['$rootScope', '$scope', 'ApiRest', 'ngToast', 'urls', '$state',
  function($rootScope, $scope, ApiRest, ngToast, urls, $state) {
   ApiRest.one('events').get().then(function(data) {
    $scope.events = data;
   });
   $scope.save = function(index, event_id) {
    // raw JS because FISI
    var begin = document.getElementsByName('begin-' + index)[0].value;
    var end = document.getElementsByName('end-' + index)[0].value;
    var description = document.getElementsByName('description-' + index)[0].value;

    ApiRest.all('execs/events/' + event_id + '/update').post({
     description: description,
     begin: begin,
     end: end,
     event_id: event_id
    }).then(function(response) {
     var content = response.message;
     if (response.message === 'validation') {
      content += '<br/>' + JSON.stringify(response.data)
     }
     document.getElementById("alert-" + index).innerHTML = content;
     document.getElementById("alert-" + index).style.display = 'block';
    });
    console.log("clicked button with index " + index + " and event # " + event_id)
    console.log('begin: ' + begin + ', end: ' + end + ', description: ' + description)
   };
   $scope.commit = function() {
    ApiRest.all('execs/events/create').post({
      title: document.getElementsByName('new-input-title')[0].value,
      description: document.getElementsByName('new-input-description')[0].value,
      begin: document.getElementsByName('new-input-begin')[0].value,
      end: document.getElementsByName('new-input-end')[0].value
    }).then(function(response) {
     var content = response.message;
     if (response.message === 'validation') {
      content += '<br/>' + JSON.stringify(response.data)
     } else if (response.message === 'success') {
      document.getElementsByName('new-input-title')[0].value = "";
      document.getElementsByName('new-input-description')[0].value = "";
     }
     document.getElementById("alert-new").innerHTML = content;
     document.getElementById("alert-new").style.display = 'block';
    });     
   };
   $scope.delete = function(index, event_id) {
    ApiRest.all('execs/events/' + event_id + '/delete').post({
    }).then(function(response) {
      if(response.message === 'event_in_use') {
        document.getElementById('alert-' + index).innerHTML = 'Could not delete event - currently used by a pod';
        document.getElementById('alert-' + index).style.display = 'block';
        document.getElementById('delete-' + index).className = "btn btn-danger";
      } else {
        angular.element('#panel-' + index).remove();
      }
    });    
   }
  }
 ]);