var RNG = (function() {

  var self = this;
  var currentRng = null;
  var ALL_RNGS = {};
    
  self.Default = "default";
  self.AlwaysSuccess = "alwaysSuccess";
  self.AlwaysFailure = "alwaysFailure";
  
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
  
  var execute = function(method, args) {
    return currentRng[method].apply(currentRng, args);  
  };
  
  var RngImpl = function(id) {
      this.id = id;
      ALL_RNGS[id] = this;
  };
  
  RngImpl.prototype.percent = function(pct) {
    var params = isDecimal(pct) ? decimalPercentToInteger(pct) : {max:100, pct:pct};
    return self.randomUpTo(params.max) <= params.pct; 
  };
  RngImpl.prototype.randomArrayElement = function(array) { return array[self.randomUpTo(array.length - 1, 0)]; };
    
  RngImpl.prototype.randomUpTo = function(max, min) {
    if (min == null) {
      min = 1;
    }
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };
    
  RngImpl.prototype.shuffle = function(myArray) {
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
  
  var AlwaysSuccessRng = function() {};
  AlwaysSuccessRng.prototype = new RngImpl(self.AlwaysSuccess);
  AlwaysSuccessRng.prototype.randomUpTo = function(max, min) { 
    if (max == Action.AUTO_MISS) {
      return Action.AUTO_HIT;
    }
    return min == null ? 1 : min; 
  };
  AlwaysSuccessRng.prototype.percent = function(pct) { return true; };
  
  var AlwaysFailureRng = function() {};
  AlwaysFailureRng.prototype = new RngImpl(self.AlwaysFailure);
  AlwaysFailureRng.prototype.randomUpTo = function(max, min) { 
    if (max == Action.AUTO_MISS) {
      return Action.AUTO_MISS;
    }
    return max; 
  };
  AlwaysFailureRng.prototype.percent = function(pct) { return false; };
  
  var DEFAULT = new RngImpl(self.Default);
  
  /* ======================================================== */
  /* PUBLIC METHODS ----------------------------------------- */
  /* ======================================================== */
  self.useDefault = function() {
      currentRng = DEFAULT;
  };
  
  self.useCustom = function(rngId) {
      if (!ALL_RNGS[rngId]) {
          console.log("No RNG found with id [" + rngId + "]");
          return false;
      }
      currentRng = ALL_RNGS[rngId];
  };
  
  self.percent = function(pct) { return execute("percent", arguments); };
  self.randomArrayElement = function(array) { return execute("randomArrayElement", arguments); };
  self.randomUpTo = function(max, min) { return execute("randomUpTo", arguments); };
  self.shuffle = function(myArray) { return execute("shuffle", arguments); };
  
  return this;
}).call({});


