var Party = (function() {
    
  var self = this;
  
  var chars = [];
  var gold = 0;
  var stepsUntilBattle = -1;
  
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
    worldMapPosition = new Map.Coords(5, 4, 4, 24).toAbsolute();
    self.createTestChars(); // TODO: remove this
    self.jumpTo(worldMapPosition);
    self.resetStepsUntilBattle();
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
  
  // TODO: remove this and anything that calls it
  self.createTestChars = function() {
    var charClasses = [CharacterClass.FIGHTER, CharacterClass.THIEF, CharacterClass.WHITE_MAGE, CharacterClass.BLACK_MAGE];
    for (var i = 0; i < charClasses.length; i++) {
      var name = "";
      for (var n = 0; n < 4; n++) { 
        name += String.fromCharCode(65 + +i); 
      }
      self.addChar(self.createNewChar(name, charClasses[i], i));
    }
  };
  
  self.getChar = function(index) { return chars[index]; };
  self.getChars = function() { return chars; };
  self.getGold = function() { return gold; };
  self.getMap = function() { return Map.getMap(currentMap); };
  self.getTransportation = function() { return currentTransportation; };
  
  self.isDestinationPassable = function(yChange, xChange) {
    if (self.getMap().is(Map.WORLD_MAP)) {
      var oldPos = new Map.AbsoluteCoords(worldMapPosition);
      worldMapPosition.adjust(yChange, xChange);
      var tile = WorldMap.Config.getTileAbsolute(worldMapPosition);
      var mapping = WorldMap.Config.getParentTileMapping(tile);
      var passable = mapping.isPassableUsing(currentTransportation);
      if (!passable) {
        worldMapPosition = oldPos;
      } else if (mapping.decrementBattleSteps) {
        stepsUntilBattle--;
        if (stepsUntilBattle <= 0) {
          self.startBattle();
        }
      }
      console.log("# steps till battle=" + stepsUntilBattle + " - " + worldMapPosition.toString() + " - " + worldMapPosition.toCoords().toString());
      return passable;
    }
  };
  
  self.jumpTo = function(absoluteCoords) {
    worldMapPosition = absoluteCoords;
    var playerTop = Util.cssNumericValue($player.css("marginTop"));
    var playerLeft = Util.cssNumericValue($player.css("marginLeft"));
    var top = (absoluteCoords.y * Map.TILE_SIZE) - playerTop;
    var left = (absoluteCoords.x * Map.TILE_SIZE) - playerLeft;
    top *= -1;
    left *= -1;
    $player.closest("#view").css({backgroundPosition:left + "px " + top + "px"});
  };
  
  self.resetStepsUntilBattle = function() {
    var steps = null;
    if (self.getMap().is(Map.WORLD_MAP)) {
      steps = Encounter.Steps[Map.WORLD_MAP];
    } else {
      console.error("Player is in an unsupported map [" + map + "]");
    }
    
    if (steps) {
      stepsUntilBattle = RNG.randomUpTo(steps.max, steps.min);
    }
  };
  
  self.startBattle = function() {
    var map = self.getMap();
    if (map.is(Map.WORLD_MAP)) {
      var coords = worldMapPosition.toCoords();
      var encounter = Encounter.random(map.id, coords.tilesetX() + "-" + coords.tilesetY());
      var config = WorldMap.Config;
      var tileMapping = config.getParentTileMapping(config.getTile(coords));
      //console.log(encounter);
      
      KeyPressNotifier.clearListener();
      Battle.setup(jQuery.extend(true, {background: tileMapping.background}, encounter));
    }

    self.switchView("#battleView");
    
    self.resetStepsUntilBattle();
  };
  
  self.switchView = function(view) {
    $("body > .main").hide();
    $(view).show();
  };
  
  return this;
}).call({});