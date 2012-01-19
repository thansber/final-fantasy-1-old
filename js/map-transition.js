define( 
/* MapTransition */
["logger", "map-config", "map-coords-absolute"], 
function(Logger, MapConfig, MapCoordsAbsolute) {
  
  var ALL_TRANSITIONS = {};
  
  var Transition = function(from, to, fromCoords, toCoords) {
    this.from = from;
    this.to = to;
    if (fromCoords) {
      this.fromCoords = MapCoordsAbsolute.create(fromCoords);
      this.toCoords = toCoords ? MapCoordsAbsolute.create(toCoords) : MapConfig.lookup(to).start;
    }
    
    var transitionsForFrom = ALL_TRANSITIONS[this.from];
    if (!transitionsForFrom) {
      transitionsForFrom = [];
      ALL_TRANSITIONS[this.from] = transitionsForFrom;
    }
    transitionsForFrom.push(this);
  };
    
  return {
    All : ALL_TRANSITIONS
   ,create : function(from, to, fromCoords, toCoords) { return new Transition(from, to, fromCoords, toCoords); }
   ,lookup : function(map, coords) {
      var transitions = ALL_TRANSITIONS[map];
      if (!transitions || transitions.length == 0) {
        Logger.error("No map transitions were found for map [" + map + "], you sure you have any setup?");
        return null;
      }
  
      var mapConfig = MapConfig.lookup(map);
      if (mapConfig && mapConfig.exitOnOutOfBounds) {
        if (mapConfig.isOutsideTownMap(coords)) {
          var transition = $.extend({backToWorldMap:true}, transitions[0]);
          return transition;
        }
      } else {
        for (var t = 0; t < transitions.length; t++) {
          if (coords.equals(transitions[t].fromCoords)) {
            return transitions[t];
          }
        }
      }
      return null;
    }
   ,showAllTransitions : function() {
      for (var from in ALL_TRANSITIONS) {
        var transitions = ALL_TRANSITIONS[from];
        for (var t = 0; t < transitions.length; t++) {
          var transition = transitions[t];
          Logger.debug("transition from " + from + " at " + transition.fromCoords.toString() + " to " + transition.to + " at " + transition.toCoords.toString());
        }
      }
    }
  };
});