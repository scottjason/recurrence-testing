angular.module('BoilerPlate')
  .service('Api', function($http) {

    'use strict'

    function saveActivity(data) {
      var request = $http({
        method: 'POST',
        url: '/saveActivity',
        data: {
          activity: data
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
      saveActivity: saveActivity
    });
    Api.$inject('$http');
  });
