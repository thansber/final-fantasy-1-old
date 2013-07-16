define(
/* MapTransition */
["logger", "maps/map", "map-coords-absolute"],
function(Logger, Map, MapCoordsAbsolute) {

  var ALL_TRANSITIONS = {};
  var ALL_TRANSITIONS_BY_COORDS = {};

  var Transition = function(from, to, fromCoords, toCoords) {
    this.from = from;
    this.to = to;
    if (fromCoords) {
      this.fromCoords = MapCoordsAbsolute.create(fromCoords);
      this.toCoords = toCoords ? MapCoordsAbsolute.create(toCoords) : (Map.lookup(to) ? Map.lookup(to).start : null);

      var coordsTransitionsForFrom = ALL_TRANSITIONS_BY_COORDS[this.from];
      if (!coordsTransitionsForFrom) {
        coordsTransitionsForFrom = {};
        ALL_TRANSITIONS_BY_COORDS[this.from] = coordsTransitionsForFrom;
      }
      coordsTransitionsForFrom[this.fromCoords.y] = {};
      coordsTransitionsForFrom[this.fromCoords.y][this.fromCoords.x] = this;
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

      var mapConfig = Map.lookup(map);
      if (mapConfig && mapConfig.exitOnOutOfBounds) {
        if (mapConfig.isOutsideTownMap(coords)) {
          var transition = $.extend({backToWorldMap:true}, transitions[0]);
          return transition;
        }
      } else {
        var yTransitions = ALL_TRANSITIONS_BY_COORDS[map][coords.y];
        if (yTransitions && yTransitions[coords.x]) {
          return yTransitions[coords.x];
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