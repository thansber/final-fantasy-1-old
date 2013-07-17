define(
/* Util */
["jquery"],
function($) {

  var NestedMap = function() {
    this.map = {};
  };
  // keys can be either an array or extra parameters
  NestedMap.prototype.add = function(o, keyArgs) {
    if (!($.isArray(keyArgs))) {
      keyArgs = Array.prototype.slice.call(arguments, 1);
    }
    var lastKey = keyArgs.splice(-1);
    var currentMap = this.map;
    keyArgs.forEach(function(key) {
      if (!currentMap[key]) {
        currentMap[key] = {};
      }
      currentMap = currentMap[key];
    });
    currentMap[lastKey] = o;
  };

  NestedMap.prototype.get = function(keyArgs) {
    if (!($.isArray(keyArgs))) {
      keyArgs = Array.prototype.slice.call(arguments);
    }
    var currentMap = this.map;
    var currentObj = null;
    keyArgs.every(function(key) {
      currentObj = currentMap[key];
      currentMap = currentObj;
      return currentObj;
    });
    return currentObj;
  };

  return {
    cssNumericValue : function(s) { return parseInt(s.replace("px", "")); },

    getCssClass : function(source, where) {
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
    },
    NestedMap: NestedMap
  };
});