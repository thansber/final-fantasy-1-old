var Util = (function() {
  
  var cssNumericValue = function(s) {
    return parseInt(s.replace("px", ""));
  };
  
  return {
    cssNumericValue: cssNumericValue
  };
})();