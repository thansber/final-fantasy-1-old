define(
/* MapTransition */
["logger", "maps/map", "constants/map", "util"],
function(Logger, Map, MapConstants, Util) {

  var ALL_TRANSITIONS_BY_COORDS = new Util.NestedMap();
  var TRANSITIONS_TO_WORLD_MAP = {};

  var Transition = function(id, fromCoords) {
    this.from = id;
    if (fromCoords) {
      this.fromCoords = new Map.Coords(fromCoords);
      ALL_TRANSITIONS_BY_COORDS.add(this, this.from, this.fromCoords.y, this.fromCoords.x);
    }
  };
  Transition.prototype.to = function(id, toCoords) {
    this.to = id;
    this.toCoords = toCoords ? new Map.Coords(toCoords) : (Map.lookup(this.to) ? Map.lookup(this.to).start : null);

    if (this.to === MapConstants.WORLD_MAP) {
      TRANSITIONS_TO_WORLD_MAP[this.from] = this;
    }
  };

  return {
    from: function(from, fromCoords) {
      return new Transition(from, fromCoords);
    },
    lookup: function(mapId, coords) {
      var map = Map.lookup(mapId);
      if (!map) {
        return null;
      }
      if (map.isOutOfBounds(coords)) {
        return {backToWorldMap:true, to:MapConstants.WORLD_MAP};
      } else {
        return ALL_TRANSITIONS_BY_COORDS.get(mapId, coords.y, coords.x);
      }
      return null;
    },
    start: function() {
      return ALL_TRANSITIONS_BY_COORDS.get(MapConstants.WORLD_MAP, -1, -1);
    },
    toWorldMap: function(fromId) {
      return TRANSITIONS_TO_WORLD_MAP[fromId];
    }
  };
});