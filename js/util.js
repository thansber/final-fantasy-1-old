define( 
/* Util */
(function() {
  
  this.cssNumericValue = function(s) {
    return parseInt(s.replace("px", ""));
  };
  
  this.getCssClass = function(source, where) {
    
    var cssClasses = null;
    if (typeof source === "string") {
      cssClasses = source.split(" ");
    } else {
      cssClasses = source.attr("class").split(" ");
    }
    
    var start = -1, end = -1, index = -1;
    if (typeof where === "string") {
      if (where == "last") {
        return cssClasses[cssClasses.length - 1];
      } else if (where.indexOf("-") > -1) {
        var indeces = where.split("-");
        start = indeces[0];
        end = indeces[1];
        return cssClasses.splice(start, end);
      } else {
        index = parseInt(where, 10);
      }
    }
    
    return cssClasses[index];
  };
  
  return this;
}).call({})
);