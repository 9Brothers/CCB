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
