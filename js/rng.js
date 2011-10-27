var RNG = (function() {

  var self = this;
    
  var isDecimal = function(n) { return n % 1 != 0; };
  var decimalPercentToInteger = function(d) {
    if (!isDecimal(d)) {
      return {max:100, pct:d};
    }
    
    var adjusted = d;
    var numDecimals = 0;
    while (isDecimal(adjusted)) {
      adjusted *= 10;
      numDecimals++;
    }
    
    return {max:(100 * Math.pow(10, numDecimals)), pct:adjusted};
  };
  
  var randomPercentage = function(max, pct) { (randomUpTo(max) <= pct); };
  
  var check = function(num) {
    var t = 0, f = 0;
    for (var i = 0; i < 100; i++) {
      percent(num) ? t++ : f++;
    }
    console.log("for a " + num + "% chance, " + t + " were true, " + f + " were false");
  };
  
  /* ======================================================== */
  /* PUBLIC METHODS ----------------------------------------- */
  /* ======================================================== */
  self.percent = function(pct) {
    var params = isDecimal(pct) ? decimalPercentToInteger(pct) : {max:100, pct:pct};
    return self.randomUpTo(params.max) <= params.pct; 
  };
  self.randomArrayElement = function(array) { return array[self.randomUpTo(array.length - 1, 0)]; };
  
  self.randomUpTo = function(max, min) {
    if (min == null) {
      min = 1;
    }
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };
  
  self.shuffle = function(myArray) {
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
}).call({});


