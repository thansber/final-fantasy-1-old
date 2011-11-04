var Party = (function() {
    
  var self = this;
  
  var chars = [];
  var gold = 0;
  
  var $player = null;
  var worldMapPosition = null;
  var currentMap = null;
  var currentTransportation = null;
  
  /* =========== */
  /* INIT METHOD */
  /* =========== */
  self.init = function(opt) {
    $player = $(opt.player);
    currentMap = Map.WORLD_MAP;
    currentTransportation = Movement.Transportation.FOOT;
    worldMapPosition = new Map.Coords(10, 9, 4, 8).toAbsolute();
    self.jumpTo(worldMapPosition);
  };
  
  /* =============== */
  /* PRIVATE METHODS */
  /* =============== */
  /* ============== */
  /* PUBLIC METHODS */
  /* ============== */
  self.addChar = function(c) { chars.push(c); };
  self.addGold = function(gp) { gold += gp; };
  self.clearChars = function() { chars = []; };
  
  self.createNewChar = function(name, charClass, index) {
    var startingStats = CharacterGrowth.startingStats[charClass];
    var char = Character.create().name(name).charClass(charClass).index(index);
    char.stats(startingStats).hp(startingStats.hp);
    CharacterGrowth.addMaxChargesToChar(char);
    char.refillSpellCharges();
    return char;
  };
  
  self.getChar = function(index) { return chars[index]; };
  self.getChars = function() { return chars; };
  self.getGold = function() { return gold; };
  self.getTransportation = function() { return currentTransportation; };
  
  self.isDestinationPassable = function(yChange, xChange) {
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
  
  self.jumpTo = function(absoluteCoords) {
    worldMapPosition = absoluteCoords;
    var playerTop = Util.cssNumericValue($player.css("marginTop"));
    var playerLeft = Util.cssNumericValue($player.css("marginLeft"));
    var top = (absoluteCoords.y * Map.SIZE) - playerTop;
    var left = (absoluteCoords.x * Map.SIZE) - playerLeft;
    top *= -1;
    left *= -1;
    $player.closest("#view").css({backgroundPosition:left + "px " + top + "px"});
  };
  
  return this;
}).call({});