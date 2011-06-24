var Party = (function() {
  var chars = [];
  
  var $player = null;
  var worldMapPosition = null;
  var currentMap = null;
  var currentTransportation = null;
  
  /* =========== */
  /* INIT METHOD */
  /* =========== */
  var init = function(opt) {
    $player = $(opt.player);
    currentMap = Map.WORLD_MAP;
    currentTransportation = Movement.Transportation.FOOT;
    worldMapPosition = new Map.Coords(10, 9, 4, 8).toAbsolute();
    jumpTo(worldMapPosition);
  };
  
  /* =============== */
  /* PRIVATE METHODS */
  /* =============== */
  /* ============== */
  /* PUBLIC METHODS */
  /* ============== */
  var addChar = function(c) {
    chars.push(c);
  };
  
  var clearChars = function() {
    chars = [];
  };
  
  var createNewChar = function(name, charClass, index) {
    var startingStats = CharacterGrowth.startingStats[charClass];
    var char = Character.create().name(name).charClass(charClass).index(index);
    char.stats(startingStats).hp(startingStats.hp);
    CharacterGrowth.addMaxChargesToChar(char);
    char.refillSpellCharges();
    return char;
  };
  
  var getChar = function(index) {
    return chars[index];
  };
  
  var getChars = function() {
    return chars;
  };
  
  var getTransportation = function() {
    return currentTransportation;
  };
  
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
   
   ,addChar: addChar
   ,clearChars: clearChars
   ,createNewChar: createNewChar
   ,getChar: getChar
   ,getChars: getChars
   ,getTransportation: getTransportation
   ,isDestinationPassable: isDestinationPassable
   ,jumpTo: jumpTo
  };
})();