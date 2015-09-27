'use strict';

angular.module('BoilerPlate')
  .controller('Landing', Landing);

function Landing($scope, $rootScope, $state, $timeout) {

  $scope.activity = {};
  $scope.activity.dates = {};
  $scope.activity.recurrence = {};

  $scope.results = [];

  $scope.setStartsOn = function(dateSelected) {
    $scope.startsOn = dateSelected;
    $scope.startsOnFormatted = moment(dateSelected).format('MMMM Do YYYY');
  };

  $scope.setStartsAt = function(dateSelected) {
    $scope.startsAt = dateSelected;
    $scope.startsAtFormatted = moment(dateSelected).format('h:mm a');
  };

  $scope.setEndsAt = function(dateSelected) {
    $scope.endsAt = dateSelected;
    $scope.endsAtFormatted = moment(dateSelected).format('h:mm a');
  };

  $scope.setExpiresOn = function(dateSelected) {
    $scope.activity.recurrence.expiresOn = dateSelected;
    $scope.expiresOnFormatted = moment(dateSelected).endOf('Day').format('dddd, MMMM Do, YYYY h:mm a');
  };

  $scope.onSubmit = function() {
    if ($scope.startsOn && $scope.startsAt && $scope.endsAt && $scope.activity.recurrence.expiresOn) {
      var isEndGreater = ($scope.endsAt.getTime() > $scope.startsAt.getTime());
      var isExpGreater = ($scope.activity.recurrence.expiresOn.getTime() > $scope.endsAt.getTime());
      console.log($scope.activity.recurrence.expiresOn)
      console.log(isExpGreater);
      if (isEndGreater && isExpGreater) {
        generateEventBounds();
      } else {
        console.log('Invalid Input');
      }
    } else {
      console.log('Invalid Input');
    }
  };

  function generateEventBounds() {

    var minute = (angular.copy($scope.startsAt)).getMinutes();
    var hour = (angular.copy($scope.startsAt)).getHours();
    var day = (angular.copy($scope.startsAt)).getDate();
    var month = (angular.copy($scope.startsAt)).getMonth();
    var year = (angular.copy($scope.startsAt)).getFullYear();

    $scope.activity.dates.start = new Date(year, month, day, hour, minute);
    var duration = ($scope.endsAt.getTime() - $scope.startsAt.getTime());
    $scope.activity.dates.end = new Date(($scope.activity.dates.start).getTime() + duration);

    if (!$scope.activity.recurrence.interval) {
      $scope.activity.recurrence.interval = 1;
    }
    generateWeekDays();
  }

  function generateWeekDays() {

    var byDay = [];
    var byDayDisplay = [];

    var isMonday = $('#monday').is(':checked');
    var isTuesday = $('#tuesday').is(':checked');
    var isWednesday = $('#wednesday').is(':checked');
    var isThursday = $('#thursday').is(':checked');
    var isFriday = $('#friday').is(':checked');
    var isSaturday = $('#saturday').is(':checked');
    var isSunday = $('#sunday').is(':checked');

    if (isMonday) {
      byDay.push(0);
      byDayDisplay.push('Mon');
    }
    if (isTuesday) {
      byDay.push(1);
      byDayDisplay.push('Tue');
    }
    if (isWednesday) {
      byDay.push(2);
      byDayDisplay.push('Wed');
    }
    if (isThursday) {
      byDay.push(3);
      byDayDisplay.push('Thu');
    }
    if (isFriday) {
      byDay.push(4);
      byDayDisplay.push('Fri');
    }
    if (isSaturday) {
      byDay.push(5);
      byDayDisplay.push('Sat');
    }
    if (isSunday) {
      byDay.push(6);
      byDayDisplay.push('Sun');
    }

    $scope.activity.recurrence.byDay = byDay;

    generateRRule();
  }

  function generateRRule() {

    var rule = new RRule({
      freq: RRule.WEEKLY,
      interval: $scope.activity.recurrence.interval,
      byweekday: $scope.activity.recurrence.byDay,
      dtstart: $scope.activity.dates.start,
      until: $scope.activity.recurrence.expiresOn
    });

    $scope.allOcurrences = rule.all();
    $scope.numEvents = $scope.allOcurrences.length;
    generateActivites();
  }

  function generateActivites() {

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









  $scope.init = function() {};

  Landing.$inject['$scope', '$rootScope', '$state', '$timeout'];
}
