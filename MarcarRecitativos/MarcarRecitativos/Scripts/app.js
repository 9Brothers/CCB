'use strict'

var baseUrl = window.location.protocol + '/' + window.location.hostname;

angular.module("ccbApp", [
  'ngRoute',  
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
      .otherwise({
        redirectTo: '/'
      })
  }
])

.directive('contagemMeninas', [
  '_paths',
  function(path) {
    return {
      restrict: 'E',
      templateUrl: path.directives + '/meninas.html'
    }
  }
])

.directive('contagemMeninos', [
  '_paths',
  function(path) {
    return {
      restrict: 'E',
      templateUrl: path.directives + '/meninos.html'
    }
  }
])

.controller('DefaultCtrl', [
  function () {
    var vm = this;
    vm.today = new Date();
    
    vm.mocidade = [
      { gender: 'menina', total: 0 },      
      { gender: 'moca', total: 0 },
      { gender: 'menino', total: 0 },
      { gender: 'moco', total: 0 },
    ];
  
    vm.addFemaleContinuation = function() {
      vm.mocidade.push({ gender: 'menina', total: 0 });
    }

    vm.addMaleContinuation = function() {
      vm.mocidade.push({ gender: 'menino', total: 0 });
    }

    vm.girlAndYoungWomanFilter = function(item) {
      return item.gender === 'menina' || item.gender === 'moca';
    }

    vm.boyAndYoungManFilter = function(item) {
      return item.gender === 'menino' || item.gender === 'moco';
    }
  }
])

Array.prototype.Sum = function (attr) {
  var numbers = this;
  var result = 0;

  for (var i = 0; i < numbers.length; i++) {
    result += numbers[i][attr];    
  }

  return result;
}