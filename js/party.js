var Party = (function() {
  var $player = null;
  var chars = [];
  var worldMapPosition = null;
  var currentMap = null;
  var currentTransportation = null;
  
  var Transportation = (function() {
    return {
      FOOT: "foot"
     ,SHIP: "ship"
     ,CANOE: "canoe"
     ,AIRSHIP: "airship"
    }
  })();
  
  /* =========== */
  /* INIT METHOD */
  /* =========== */
  var init = function(opt) {
    $player = $(opt.player);
    currentMap = Map.WORLD_MAP;
    currentTransportation = Transportation.FOOT;
    worldMapPosition = new Map.Coords(10, 9, 4, 8).toAbsolute();
    jumpTo(worldMapPosition);
  };
  
  /* =============== */
  /* PRIVATE METHODS */
  /* =============== */
  /* ============== */
  /* PUBLIC METHODS */
  /* ============== */
  var isDestinationPassable = function(yChange, xChange) {
    var map = Map.getMap(currentMap);
    if (map.is(Map.WORLD_MAP)) {
      var oldPos = new Map.AbsoluteCoords(worldMapPosition);
      worldMapPosition.adjust(yChange, xChange);
      var tile = WorldMap.Config.getTileAbsolute(worldMapPosition);
      var mapping = WorldMap.Config.getParentTileMapping(tile);
      var passable = mapping.isPassableUsing(currentTransportation);
      if (!passable) {
        worldMapPosition = oldPos;
      }
      return passable;
    }
  };
  
  var jumpTo = function(absoluteCoords) {
    worldMapPosition = absoluteCoords;
    var playerTop = Util.cssNumericValue($player.css("marginTop"));
    var playerLeft = Util.cssNumericValue($player.css("marginLeft"));
    var top = (absoluteCoords.y * Map.SIZE) - playerTop;
    var left = (absoluteCoords.x * Map.SIZE) - playerLeft;
    top *= -1;
    left *= -1;
    $player.closest("#view").css({backgroundPosition:left + "px " + top + "px"});
  };
  
  return {
    init: init
   
   ,isDestinationPassable: isDestinationPassable
   ,jumpTo: jumpTo
   
   ,Transportation: Transportation
  };
})();