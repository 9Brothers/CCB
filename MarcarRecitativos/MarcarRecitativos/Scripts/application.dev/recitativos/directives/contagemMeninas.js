(function () {
  'use strict';

  angular.module('ccbApp.directives')

    .directive('contagemMeninas', [
      '_paths',
      function (path) {
        return {
          restrict: 'E',
          templateUrl: path.directives + '/meninas.html'
        }
      }
    ])
})();
