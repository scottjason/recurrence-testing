angular.module('BoilerPlate')
  .service('UUID', function() {

    'use strict'

    function generate() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }

    return ({
      generate: generate
    });
  });
