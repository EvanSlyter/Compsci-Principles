// finds the longest word in a list of strings
function longest(list){
 var long=list[0];
  for(var i=0;i<list.length;i++){
    if(list[i].length>long.length){
      long=list[i];
    }
  }
  return long;
}

//console.log(longest(["twitter","watermelon","hi","heee","heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"]));

//finds the shortest word in a list of strings
function shortest(list){
 var short=list[0];
  for(var i=0;i<list.length;i++){
    if(list[i].length<short.length){
      short=list[i];
    }
  }
  return short;
}
//console.log(shortest(["twitter","watermelon","hi","heee","heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"]));

//combines strings in a list into one string
function combine(list){
  var bigString=list[0];
  for (var i=1;i<list.length;i++){
  bigString=bigString+" "+list[i];  
  }
  return bigString;
}

//console.log(combine(["Hello","there","yes"]));
//console.log(combine([1,4,5,7,22]));

//replaces all the words in a list with "a"s
function scream (list,minLength,maxLength){
  var number="A";
  for(var i=0;i<list.length;i++){
    list[i]=number;
  for(var j=minLength; j<maxLength;j++){
        number=number+"A";
  }
  }return list;
}
//console.log(scream(["hello","there","hi","hoy"],3,67));
