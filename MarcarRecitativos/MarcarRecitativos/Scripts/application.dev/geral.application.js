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