Array.prototype.Sum = function (attr) {
  var numbers = this;
  var result = 0;

  for (var i = 0; i < numbers.length; i++) {
    result += numbers[i][attr];    
  }

  return result;
};

Array.prototype.FindIndex = function(search, attr) {
  var thisArray = this;
  var childs = attr.split('.')
  var objeto = null;

  // verifica se não é um array vazio
  if(!this.length) return false;

  // verifica se existe atributo no array
  var firstObject = this[0];

  // monta a string no qual faremos um evaluate
  var mountString = 'firstObject';

  for (var j = 0; j < childs.length; j++) {

    mountString += '.' + childs[j]

    objeto = eval(mountString);

    if(objeto === undefined) return false;
  }

  // caso tenha chegado até aqui, significa que o caminho até o objeto existe
  // verifica se o objeto procurado existe no array
  for (var i = 0; i < thisArray.length; i++) {
    var element = thisArray[i];

    if(eval('element.' + attr) == search) return i;
  }

  return false;
};
//# sourceMappingURL=geral.application.js.map

//# sourceMappingURL=geral-app.js.map

function encodeContagem(mocidade) {
  for (var i = 0; i < mocidade.length; i++) {
    mocidade[i].gender = decodeGender(mocidade[i].gender);        
  }

  return mocidade;
}

function decodeContagem(mocidade) {
  for (var i = 0; i < mocidade.length; i++) {
    mocidade[i].gender = encodeGender(mocidade[i].gender);        
  }

  return mocidade;
}

function decodeGender(gender) {
  if(gender == 0) return 'menina';
  else if(gender == 1) return 'moca';
  else if(gender == 2) return 'menino';
  else if(gender == 3) return 'moco';
}

function encodeGender(gender) {
  if(gender == 'menina') return 0;
  else if(gender == 'moca') return 1;
  else if(gender == 'menino') return 2;
  else if(gender == 'moco') return 3;
}
//# sourceMappingURL=geral.recitativos.js.map

//# sourceMappingURL=geral-recitativos.js.map

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

(function () {
  'use strict';

  angular.module('ccbApp.factories')

    .factory('ContagemRecitativos', [
      '$http',
      function ($http) {
        return {
          get: {
            All: function (guid) {
              return $http.get('/api/Recitativos/' + (guid || ''));
            },
            ByDate: function (date) {
              if (date && date.day && date.month && date.year)
                return $http.get('/api/Recitativos/ByDate/' + date.day + '/' + date.month + '/' + date.year);

              else return $http.get('/api/Recitativos/ByDate/');
            }
          },
          add: function (data) {
            return $http.post('/api/Recitativos/', JSON.stringify(data), {
              headers: { 'Accept': 'application/json' },
              dataType: 'json'
            });
          },
          update: function (guid, data) {
            return $http.put('/api/Recitativos/Update/' + (guid || ''), JSON.stringify(data), {
              headers: { 'Accept': 'application/json' },
              dataType: 'json'
            });
          },
          delete: function (guid) {
            if (guid) return $http.delete('/api/Recitativos/Delete/' + (guid));
            else return false;
          }
        }
      }
    ])
})();

//# sourceMappingURL=contagemRecitativos.js.map

//# sourceMappingURL=factories.js.map

(function () {
  angular.module('ccbApp.controllers')

    .controller('ContagemCtrl', [
      'ContagemRecitativos', '$routeParams',
      function (ContagemRecitativos, $routeParams) {
        var vm = this;

        vm.today = new Date();

        console.log('hebera');

        if ($routeParams.day && $routeParams.month && $routeParams.year) {
          vm.today = new Date(
            parseInt($routeParams.year),
            parseInt($routeParams.month) - 1,
            parseInt($routeParams.day)
          );
        }

        vm.editing = false;

        vm.itemsToRemove = [];

        vm.mocidade = [];
        getMocidade();

        vm.addFemaleContinuation = function () {
          vm.mocidade.push({ gender: 'menina', total: 0 });
        };

        vm.addMaleContinuation = function () {
          vm.mocidade.push({ gender: 'menino', total: 0 });
        };

        vm.removeContinuation = function (item) {
          var index = vm.mocidade.FindIndex(item, '$$hashKey');

          vm.itemsToRemove.push(angular.copy(vm.mocidade[index]));

          vm.mocidade.splice(index, 1);
        };

        vm.girlAndYoungWomanFilter = function (item) {
          return item.gender === 'menina' || item.gender === 'moca';
        };

        vm.boyAndYoungManFilter = function (item) {
          return item.gender === 'menino' || item.gender === 'moco';
        };

        vm.saveScore = function () {
          for (var i = 0; i < vm.mocidade.length; i++) {
            var continuacao = vm.mocidade[i];
            continuacao.gender = encodeGender(continuacao.gender)

            delete continuacao.$$hashKey;
            delete continuacao.date;
            delete continuacao.recitativoGuid;

            ContagemRecitativos.add(continuacao).then(function (response) {
              response.data.gender = decodeGender(response.data.gender);

              vm.mocidade.push(response.data);

              console.log(response);
            }, function (response) {
              console.warn(response);
            });
          }

          vm.mocidade = [];
        };

        vm.editScore = function () {
          for (var i = 0; i < vm.mocidade.length; i++) {
            var continuacao = vm.mocidade[i];
            continuacao.gender = encodeGender(continuacao.gender)

            delete continuacao.$$hashKey;
            delete continuacao.date;

            if (continuacao.recitativoGuid) {
              ContagemRecitativos.update(continuacao.recitativoGuid, continuacao).then(function (response) {
                response.data.gender = decodeGender(response.data.gender);

                vm.mocidade.push(response.data);

                console.log(response);
              }, function (response) {
                console.warn(response);
              });
            }
            else {
              ContagemRecitativos.add(continuacao).then(function (response) {
                response.data.gender = decodeGender(response.data.gender);

                vm.mocidade.push(response.data);

                console.log(response);
              }, function (response) {
                console.warn(response);
              });
            }
          }

          vm.mocidade = [];

          for (var i = 0; i < vm.itemsToRemove.length; i++) {
            var itemToRemove = vm.itemsToRemove[i];

            ContagemRecitativos.delete(itemToRemove.recitativoGuid).then(function (response) { }, function (error) {
              console.warn(error);
            });
          }

          vm.itemsToRemove = [];
        }

        function getMocidade() {
          ContagemRecitativos.get.ByDate({
            day: vm.today.getDate(), month: vm.today.getMonth() + 1, year: vm.today.getFullYear()
          })
            .then(function (response) {

              if (response.data.length) {
                vm.mocidade = encodeContagem(response.data);
                vm.editing = true;
              }
              else {
                vm.mocidade = [
                  { gender: 'menina', total: 0 },
                  { gender: 'moca', total: 0 },
                  { gender: 'menino', total: 0 },
                  { gender: 'moco', total: 0 },
                ];
              }

              console.log(response);
            }, function (error) {
              console.log(error);
            })
        }
      }
    ])
})();

//# sourceMappingURL=Contagem.js.map

(function () {
  angular.module('ccbApp.controllers')

    .controller('DefaultCtrl', [
      function () {

      }
    ])
})();

//# sourceMappingURL=Default.js.map

//# sourceMappingURL=controllers.js.map
