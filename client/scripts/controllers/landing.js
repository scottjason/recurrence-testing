'use strict';

angular.module('BoilerPlate')
  .controller('Landing', Landing);

function Landing($scope, $rootScope, $state, $timeout) {

  $scope.activity = {};
  $scope.activity.dates = {};
  $scope.activity.recurrence = {};

  $scope.results = [];

  $scope.setStartsOn = function(selectedDate) {
    $scope.startsOn = selectedDate;
    $scope.startsOnFormatted = moment(selectedDate).format('MMMM Do YYYY');
  };

  $scope.setStartsAt = function(selectedDate) {
    $scope.startsAt = selectedDate;
    $scope.startsAtFormatted = moment(selectedDate).format('h:mm a');
  };

  $scope.setEndsAt = function(selectedDate) {
    $scope.endsAt = selectedDate;
    $scope.endsAtFormatted = moment(selectedDate).format('h:mm:ss a');
  };

  $scope.onSubmit = function() {
  	var isValid = ($scope.startsOn && $scope.startsAt && $scope.endsAt);
  	if (isValid) {
  		generateRecurringEvents();
  		console.log('Valid');
  	} else {
  		console.log('Invalid');
  	}
  }
// new Date(year, month, day [, hour, minute, second, millisecond ])
  function generateRecurringEvents() {
  	var minute = (angular.copy($scope.startsAt)).getMinutes();
  	var hour = (angular.copy($scope.startsAt)).getHours();
  	var day = (angular.copy($scope.startsAt)).getDate();
  	var month = (angular.copy($scope.startsAt)).getMonth();
  	var year = (angular.copy($scope.startsAt)).getFullYear();
  	console.log(new Date(year, month, day, hour, minute));
  }















  $scope.beforeRender = function($view, $dates, $leftDate, $upDate, $rightDate) {
    var index = Math.floor(Math.random() * $dates.length);
    $dates[index].selectable = false;
  }



  // Create a rule:
  var rule = new RRule({
    freq: RRule.WEEKLY,
    interval: 5,
    byweekday: [RRule.MO, RRule.FR],
    dtstart: new Date(2012, 1, 1, 10, 30),
    until: new Date(2012, 12, 31)
  });





  $scope.onTimeSet = function(selectedDate) {
    if (!$scope.activity.dates.start) {
      $scope.activity.dates.start = selectedDate;
      $scope.startsOnFormatted = moment(selectedDate).format('MMMM Do YYYY');
      console.log($scope)
    } else if (!$scope.activity.dates.end) {
      $scope.activity.dates.end = selectedDate;
    }
    console.log(selectedDate);
  };







  $scope.init = function() {};

  Landing.$inject['$scope', '$rootScope', '$state', '$timeout'];
}
