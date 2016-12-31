angular.module('ccbApp.factories', [])

.factory('ContagemRecitativos', [
  '$http',
  function ($http){
    return {
      get: {
        All: function(guid) {
          return $http.get('/api/Recitativos/' + (guid || ''));
        },
        ByDate: function(date) {
          if(date && date.day && date.month && date.year) 
            return $http.get('/api/Recitativos/ByDate/'+ date.day +'/'+ date.month +'/' + date.year);
          
          else return $http.get('/api/Recitativos/ByDate/');
        }
      },
      add: function(data) {
        return $http.post('/api/Recitativos/', JSON.stringify(data), { 
          headers: { 'Accept': 'application/json' },
          dataType: 'json'
        });
      },
      update: function(guid, data) {
        return $http.put('/api/Recitativos/Update/' + (guid || ''), JSON.stringify(data), {
          headers: { 'Accept': 'application/json' },
          dataType: 'json'
        });
      },
      delete: function(guid) {
        if(guid) return $http.delete('/api/Recitativos/Delete/' + (guid));
        else return false;
      }
    }
  }
]);

//# sourceMappingURL=contagemRecitativos.js.map
