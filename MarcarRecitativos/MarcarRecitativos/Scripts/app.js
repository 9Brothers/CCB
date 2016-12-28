'use strict'

var baseUrl = window.location.protocol + '/' + window.location.hostname;

angular.module("ccbApp", ['ngRoute'])

.constant('_ccb', {
  'viewPath': '/content/angular/recitativos'
})

.config([
  '$routeProvider', '$locationProvider', '_ccb',
  function ($routeProvider, $locationProvider, viewPath) {
    viewPath = viewPath.viewPath;

    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: viewPath + '/main.html',
        controller: 'DefaultCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      })
  }
])

.controller('DefaultCtrl', [
  function () {
    var vm = this;
    vm.today = new Date();
    
  }
])