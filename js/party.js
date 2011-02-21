var Party = (function() {
  var $player = null;
  var chars = [];
  var worldMapPosition = null;
  var currentMap = null;
  
  /* =========== */
  /* INIT METHOD */
  /* =========== */
  var init = function(opt) {
    $player = $(opt.player);
    currentMap = Map.WORLD_MAP;
    worldMapPosition = new Map.Coords(10, 9, 4, 8).toAbsolute();
    jumpTo(worldMapPosition);
  };
  
  /* =============== */
  /* PRIVATE METHODS */
  /* =============== */
  /* ============== */
  /* PUBLIC METHODS */
  /* ============== */
  var getDestination = function(yChange, xChange) {
    var mapConfig = Map.getMap(currentMap);
    
  };
  
  var jumpTo = function(absoluteCoords) {
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
   
   ,getDestination: getDestination
   ,jumpTo: jumpTo
  };
})();