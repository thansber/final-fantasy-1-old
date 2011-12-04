var Party = (function() {
    
  var self = this;
  
  var chars = [];
  var gold = 0;
  var stepsUntilBattle = -1;
  
  var $player = null;
  var currentPosition = null;
  var currentMap = null;
  var currentTransportation = null;
  
  var orbsLit = [];
  
  var views = {
    WORLD_MAP : "#map"
   ,BATTLE : "#battleView"
   ,MENU : "#charMenu"
   ,ARMOR_MENU : "#armorMenu"
   ,WEAPON_MENU : "#weaponMenu"
   ,MAGIC_MENU : "#magicMenu"
   ,STATUS_MENU : "#statusMenu"
  };
  
  // Anything in the views object can be referenced via Party.WHATEVER
  for (var v in views) {
    self[v] = views[v];
  }
  
  /* =========== */
  /* INIT METHOD */
  /* =========== */
  self.init = function(opt) {
    $player = $(opt.player);
    currentTransportation = Movement.Transportation.FOOT;
    self.createTestChars(); // TODO: remove this
    self.jumpTo(Map.WORLD_MAP, new Map.AbsoluteCoords(165, 153));
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
   self.clearChars();
    var charClasses = [CharacterClass.FIGHTER, CharacterClass.THIEF, CharacterClass.WHITE_MAGE, CharacterClass.BLACK_MAGE];
    for (var i = 0; i < charClasses.length; i++) {
      var name = "";
      for (var n = 0; n < 4; n++) { 
        name += String.fromCharCode(65 + +i); 
      }
      var char = self.createNewChar(name, charClasses[i], i);
      self.addChar(char);
    }
    
    self.getChar(0)
      .weapons().add("Short[S]").equip("Short[S]")
      .armor().add("Wooden[A]").add("Wooden[S]").add("Wooden[H]").equipAll();
    self.getChar(1)
      .weapons().add("Rapier").equip("Rapier")
      .armor().add("Wooden[A]").equipAll();
    self.getChar(2)
      .weapons().add("Iron[H]").equip("Iron[H]")
      .armor().add("Cloth").equipAll()
      .learnSpell(Spell.lookup("CURE")).learnSpell(Spell.lookup("HARM"));
    self.getChar(3)
      .weapons().add("Small[K]").equip("Small[K]")
      .armor().add("Cloth").equipAll()
      .learnSpell(Spell.lookup("FIRE")).learnSpell(Spell.lookup("LIT")).learnSpell(Spell.lookup("LOCK"));
  };
  
  self.getChar = function(index) { return chars[index]; };
  self.getChars = function() { return chars; };
  self.getGold = function() { return gold; };
  self.getLitOrbs = function() { return orbsLit; };
  self.getMap = function() { return Map.getMap(currentMap); };
  self.getTransportation = function() { return currentTransportation; };
  
  self.isDestinationPassable = function(yChange, xChange) {
    var mapConfig = self.getMap();
    var oldPos = new Map.AbsoluteCoords(currentPosition);
    
    currentPosition.adjust(yChange, xChange);
    
    var tile = mapConfig.getTileAbsolute(currentPosition);
    var mapping = mapConfig.getParentTileMapping(tile);
    var passable = mapping.isPassableUsing(currentTransportation);
    var transition = Map.findTransition(currentMap, currentPosition);
    
    if (!passable) {
      currentPosition = oldPos;
    } else if (!!transition) {
      // TODO: show CSS transition from place to place
      self.jumpTo(transition.to, transition.toCoords);
    } else if (mapConfig.hasBattles && mapping.decrementBattleSteps) {
      stepsUntilBattle--;
      if (stepsUntilBattle <= 0) {
        self.startBattle();
      }
    } 
    Logger.debug("# steps till battle=" + stepsUntilBattle + " - " + currentPosition.toString());
    return passable;
  };
  
  self.jumpTo = function(map, coords) {
    currentMap = map;
    currentPosition = coords;
    self.switchMap(currentMap);
    var playerTop = Util.cssNumericValue($player.css("marginTop"));
    var playerLeft = Util.cssNumericValue($player.css("marginLeft"));
    var top = (currentPosition.y * Map.TILE_SIZE) - playerTop;
    var left = (currentPosition.x * Map.TILE_SIZE) - playerLeft;
    top *= -1;
    left *= -1;
    $player.closest("#view").css({backgroundPosition:left + "px " + top + "px"});
  };
  
  self.lightOrb = function(orb) { orbsLit.push(orb); };
  
  self.resetStepsUntilBattle = function() {
    var steps = null;
    if (self.getMap().is(Map.WORLD_MAP)) {
      steps = Encounter.Steps[Map.WORLD_MAP];
    } else {
      Logger.error("Player is in an unsupported map [" + currentMap + "]");
    }
    
    if (steps) {
      stepsUntilBattle = RNG.randomUpTo(steps.max, steps.min);
    }
  };
  
  self.startBattle = function() {
    var mapConfig = self.getMap();
    var coords = currentPosition.toCoords(mapConfig);
    var encounter = Encounter.random(currentMap, coords.tilesetX() + "-" + coords.tilesetY());
    var tileMapping = mapConfig.getParentTileMapping(mapConfig.getTile(coords));
    Logger.debug(encounter.toString());
    
    KeyPressNotifier.clearListener();
    Battle.setup(jQuery.extend(true, {background: tileMapping.background}, encounter));

    self.switchView(self.BATTLE);
    self.resetStepsUntilBattle();
  };
  
  self.switchMap = function(map) {
    $("#view").removeClass().addClass(map);
  };
  
  self.switchView = function(view) {
    $("body > .main").hide();
    $(view).show();
  };
  
  return this;
}).call({});