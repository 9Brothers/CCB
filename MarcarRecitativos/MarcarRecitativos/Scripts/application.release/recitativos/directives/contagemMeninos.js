(function () {
  'use strict';

  angular.module('ccbApp.directives')

    .directive('contagemMeninos', [
      '_paths',
      function (path) {
        return {
          restrict: 'E',
          templateUrl: path.directives + '/meninos.html'
        }
      }
    ]);
})();

//# sourceMappingURL=contagemMeninos.js.map
