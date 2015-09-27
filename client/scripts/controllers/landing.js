'use strict';

angular.module('BoilerPlate')
  .controller('Landing', Landing);

function Landing($scope, $timeout, Api, UUID) {

  $scope.activity = {};
  $scope.activity.dates = {};
  $scope.activity.recurrence = {};
  $scope.activity.recurrence.frequency = 'WEEKLY';

  // just starts off as an array, sent to server as properly formatted string
  $scope.activity.recurrence.byDay = [];

  $scope.results = [];

  // Set incoming event start date (day, month, year)
  $scope.setStartsOn = function(dateSelected) {
    $scope.startsOn = dateSelected;
    $scope.startsOnFormatted = moment(dateSelected).format('MMMM Do YYYY');
  };

  // Set incoming event starts at time
  $scope.setStartsAt = function(dateSelected) {
    $scope.startsAt = dateSelected;
    $scope.startsAtFormatted = moment(dateSelected).format('h:mm a');
  };

  // Set incoming event ends at time
  $scope.setEndsAt = function(dateSelected) {
    $scope.endsAt = dateSelected;
    $scope.endsAtFormatted = moment(dateSelected).format('h:mm a');
  };

  // Set recurrence expiresAt at date time (end of day on date selected)
  $scope.setExpiresOn = function(dateSelected) {
    $scope.activity.recurrence.expiresOn = dateSelected;
    $scope.expiresOnFormatted = moment(dateSelected).endOf('Day').format('dddd, MMMM Do, YYYY h:mm a');
  };

  // Validate on submit form, then generate start and end dates for the first occurence
  $scope.onSubmit = function() {
    if ($scope.startsOn && $scope.startsAt && $scope.endsAt && $scope.activity.recurrence.expiresOn) {
      var isEndGreater = ($scope.endsAt.getTime() > $scope.startsAt.getTime());
      var isExpGreater = ($scope.activity.recurrence.expiresOn.getTime() > $scope.endsAt.getTime());
      if (isEndGreater && isExpGreater) {
        generateFirstOccurence();
      } else {
        renderError();
      }
    } else {
      renderError();
    }
  };

  // Generate the first occurences start and end times, handle undefined interval val
  function generateFirstOccurence() {

    var minute = (angular.copy($scope.startsAt)).getMinutes();
    var hour = (angular.copy($scope.startsAt)).getHours();
    var day = (angular.copy($scope.startsAt)).getDate();
    var month = (angular.copy($scope.startsAt)).getMonth();
    var year = (angular.copy($scope.startsAt)).getFullYear();

    $scope.activity.dates.start = new Date(year, month, day, hour, minute);
    $scope.duration = ($scope.endsAt.getTime() - $scope.startsAt.getTime());
    $scope.activity.dates.end = new Date(($scope.activity.dates.start).getTime() + $scope.duration);

    if (!$scope.activity.recurrence.interval) {
      $scope.activity.recurrence.interval = 1;
    }
    generateWeekDays();
  }

  // Collect and store the weekdays selelcted in three formats: creating the recurrence rule, rendering the view and for sending to the sever
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
      $scope.activity.recurrence.byDay.push('MO');
    }
    if (isTuesday) {
      byDay.push(1);
      byDayDisplay.push('Tue');
      $scope.activity.recurrence.byDay.push('TU');
    }
    if (isWednesday) {
      byDay.push(2);
      byDayDisplay.push('Wed');
      $scope.activity.recurrence.byDay.push('WE');
    }
    if (isThursday) {
      byDay.push(3);
      byDayDisplay.push('Thu');
      $scope.activity.recurrence.byDay.push('TH');
    }
    if (isFriday) {
      byDay.push(4);
      byDayDisplay.push('Fri');
      $scope.activity.recurrence.byDay.push('FR');
    }
    if (isSaturday) {
      byDay.push(5);
      byDayDisplay.push('Sat');
      $scope.activity.recurrence.byDay.push('SA');
    }
    if (isSunday) {
      byDay.push(6);
      byDayDisplay.push('Sun');
      $scope.activity.recurrence.byDay.push('SU');
    }

    // if no days entered when frequency is weekly
    if (!byDay.length) {
      renderError();
      return;
    }

    $scope.byDay = byDay;
    $scope.activity.recurrence.byDay = $scope.activity.recurrence.byDay.join(',');

    generateRRule();
  }

  function generateRRule() {

    var rule = new RRule({
      freq: RRule[$scope.activity.recurrence.frequency],
      interval: $scope.activity.recurrence.interval,
      byweekday: $scope.byDay,
      dtstart: $scope.activity.dates.start,
      until: $scope.activity.recurrence.expiresOn
    });

    $scope.occurences = rule.all();
    $scope.numEvents = $scope.occurences.length;
    generateActivites();
  }

  // generate an array of recurring activity objects
  function generateActivites() {

    var recurringId = UUID.generate();
    var categoryId = UUID.generate();

    var activities = [];
    var activityName = 'ng-Pandas vs bk-Buffalos';
    var activityDescription = 'See The ng-Pandas Like You\'ve Never Seen Them Before!';

    _.each($scope.occurences, function(occurence, index) {

      var activity = {};

      activity.category = categoryId;

      activity.isRecurring = true;
      activity.isFirstOccurence = (index === 0) ? true : false;
      activity.recurringId = recurringId;

      activity.name = activityName;
      activity.description = activityDescription;

      activity.dates = {};
      activity.dates.start = occurence;
      occurence = occurence.getTime();
      activity.dates.end = new Date(occurence + $scope.duration);

      activity.recurrence = {};
      activity.recurrence.frequency = $scope.activity.recurrence.frequency;
      activity.recurrence.interval = $scope.activity.recurrence.interval;
      activity.recurrence.byDay = $scope.activity.recurrence.byDay;
      activity.recurrence.expires = $scope.activity.recurrence.expiresOn;

      activities.push(activity);
    });

    saveActivities(activities);
  }

  function saveActivities(activities) {
    Api.saveActivities(activities).then(function(response) {
      console.log(response)
    }, function(err) {
      console.log(err);
    })
  }


  // Reset form on bad submit
  function resetForm() {
    $timeout(function() {
      $scope.activity = {};
      $scope.activity.dates = {};
      $scope.activity.recurrence = {};
      $scope.activity.recurrence.frequency = 'WEEKLY';
      $scope.activity.recurrence.byDay = [];
      $scope.activity.recurrence.expiresOn = null;
      $scope.startsOn = null;
      $scope.startsAt = null;
      $scope.endsAt = null;
      $scope.startsOnFormatted = null
      $scope.startsAtFormatted = null
      $scope.endsAtFormatted = null
      $scope.expiresOnFormatted = null;
    });
  }

  function renderError() {
    $scope.errMessage = 'Bad Input, User!';
    $timeout(function() {
      resetForm();
      $scope.errMessage = '';
    }, 1500);
  }

  // Date / TimePicker Method
  $scope.beforeRender = function($view, $dates, $leftDate, $upDate, $rightDate) {
    var index = Math.floor(Math.random() * $dates.length);
    $dates[index].selectable = false;
  };

  Landing.$inject['$scope', '$timeout', 'Api', 'UUID'];
}
