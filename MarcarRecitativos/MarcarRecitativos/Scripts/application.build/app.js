(function () {
  'use strict';

  var baseUrl = window.location.protocol + '/' + window.location.hostname;

  angular.module("ccbApp", [
    'ngRoute',
    'ccbApp.directives',
    'ccbApp.factories',
    'ccbApp.controllers'
  ])

    .constant('_paths', {
      'views': '/content/angular/recitativos',
      'directives': '/content/angular/recitativos/directives'
    })

    .config([
      '$routeProvider', '$locationProvider', '_paths',
      function ($routeProvider, $locationProvider, path) {
        $locationProvider.html5Mode(true);

        $routeProvider
          .when('/', {
            templateUrl: path.views + '/main.html',
            controller: 'DefaultCtrl',
            controllerAs: 'vm'
          })
          .when('/Contagem', {
            templateUrl: path.views + '/contagem.html',
            controller: 'ContagemCtrl',
            controllerAs: 'vm'
          })
          .when('/Contagem/:day/:month/:year', {
            templateUrl: path.views + '/contagem.html',
            controller: 'ContagemCtrl',
            controllerAs: 'vm'
          })
          .otherwise({
            redirectTo: '/'
          })
      }
    ]);

    angular.module('ccbApp.directives', []);
    angular.module('ccbApp.factories', []);
    angular.module('ccbApp.controllers', []);
})();
//# sourceMappingURL=app.js.map

//# sourceMappingURL=app.js.map
