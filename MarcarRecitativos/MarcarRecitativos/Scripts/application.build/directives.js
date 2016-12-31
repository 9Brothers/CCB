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

//# sourceMappingURL=contagemMeninas.js.map

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

//# sourceMappingURL=directives.js.map
