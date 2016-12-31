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
