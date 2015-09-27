angular.module('BoilerPlate')
  .service('Api', function($http) {

    'use strict'

    function saveActivities(data) {
      var request = $http({
        method: 'POST',
        url: '/saveActivity',
        data: {
          activites: data
        }
      });
      return request.then(successHandler, errorHandler);
    }

    function successHandler(response) {
      return (response);
    }

    function errorHandler(response) {
      return (response);
    }

    return ({
      saveActivities: saveActivities
    });
    Api.$inject('$http');
  });
