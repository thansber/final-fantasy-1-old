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
  
  return { 
    percent : percent
   ,randomArrayElement : randomArrayElement
   ,randomUpTo : randomUpTo
  };
})();


