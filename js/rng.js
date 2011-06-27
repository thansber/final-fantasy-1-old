var RNG = (function() {

  var percent = function(pct) {
    return (randomUpTo(100) <= pct);
  };

  var randomArrayElement = function(array) {
    return array[randomUpTo(array.length - 1, 0)];
  };
  
  var randomUpTo = function(max, min) {
    if (min == null) {
      min = 1;
    }
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };
  
  var shuffle = function(myArray) {
    var i = myArray.length;
    if ( i == 0 ) return false;
    while ( --i ) {
      var j = Math.floor( Math.random() * ( i + 1 ) );
      var tempi = myArray[i];
      var tempj = myArray[j];
      myArray[i] = tempj;
      myArray[j] = tempi;
    }
  };
  
  return { 
    percent : percent
   ,randomArrayElement : randomArrayElement
   ,randomUpTo : randomUpTo
   ,shuffle : shuffle
  };
})();


