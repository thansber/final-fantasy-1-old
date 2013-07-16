define( /* Party */
["jquery",
 "character", "character-class", "character-growth", "encounters", "equipment", "events",
 "logger", "maps/map", "maps/artist", "map-coords-absolute", "map-coords-converter", "maps/transition",
 "rng", "spells", "util", "constants/map", "constants/movement"],
function($, Character, CharacterClass, CharacterGrowth, Encounter, Equipment, Event,
         Logger, Map, MapArtist, MapCoordsAbsolute, MapCoordsConverter, MapTransition,
         RNG, Spell, Util, MapConstants, MovementConstants) {
return (function() {

  var self = this;
  self.inBattle = false;

  var chars = [];
  var gold = 0;
  var stepsUntilBattle = -1;

  var currentPosition = null;
  var currentMap = null;
  var currentShop = null;
  var currentTransportation = null;
  var worldMapPosition = null;

  var orbsLit = [];
  var consumables = [
    {name:"HealPotion", qty:0}
   ,{name:"PurePotion", qty:0}
   ,{name:"SoftPotion", qty:0}
   ,{name:"Tent", qty:0}
   ,{name:"Cabin", qty:0}
   ,{name:"House", qty:0}
  ];
  var keyItems = "0"; // heck yeah, storing a bunch of boolean as a string

  /* =============== */
  /* PRIVATE METHODS */
  /* =============== */
  var enterBattle = function() {
    var coords = MapCoordsConverter.absoluteToTile(currentPosition, self.getMap());
    var encounter = Encounter.random(currentMap, coords.tilesetX + "-" + coords.tilesetY);
    Event.transmit(Event.Types.StartBattle, encounter, self.getMap().background);
    inBattle = true;
  };

  var isNewPositionTransition = function() {
    var transition = MapTransition.lookup(currentMap, currentPosition);

    var movementCallback = null;
    // Transition check needs to be first since we can get a null mapping when we leave a town
    if (!!transition) {
      if (transition.backToWorldMap) {
        transition.toCoords = MapCoordsAbsolute.create(worldMapPosition);
      }
      movementCallback = function() { Event.transmit(Event.Types.AreaTransition, transition); };
    } else {
      movementCallback = function() { Event.transmit(Event.Types.MovingChange, false); };
    }

    Event.clear(Event.Types.MovementCallback);
    Event.listen(Event.Types.MovementCallback, movementCallback);

    return !!transition;
  };

  var moveToPosition = function(xChange, yChange) {
    // We are currently moving the character
    MapArtist.moveOneSquare({map:self.getMap(), position:currentPosition, x:xChange, y:yChange});
  };

  /* ============== */
  /* PUBLIC METHODS */
  /* ============== */
  self.addChar = function(c) { chars.push(c); };
  self.addConsumable = function(name, amount) {
    $.each(consumables, function(i, item) {
      if (item.name == name) {
        item.qty += amount;
      }
    });
    return this;
  };
  self.addGold = function(gp) { gold += gp; if (gold < 0) { gold = 0; } };
  self.addKeyItem = function(name) {
    var keyItemFlags = parseInt(keyItems, 36);
    keyItemFlags = keyItemFlags | Equipment.KeyItem.lookup(name).index;
    keyItems = keyItemFlags.toString(36);
  };
  self.buy = function(gp) { self.addGold(-1 * gp); };
  self.clearChars = function() { chars = []; };
  self.clearLastChar = function() {
    if (chars.length > 0) {
      chars.splice(chars.length - 1, 1);
    }
  };
  self.createNewChar = function(name, charClass, index) {
    var startingStats = CharacterGrowth.startingStats[charClass];
    var char = Character.create().name(name).charClass(charClass).index(index === undefined ? chars.length : index);
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

    self.addGold(400);
    self.addConsumable("HealPotion", 23)
        .addConsumable("PurePotion", 7)
        .addConsumable("SoftPotion", 2)
        .addConsumable("Tent", 4)
        .addConsumable("Cabin", 1);
  };

  self.getAliveChars = function() {
    var aliveChars = [];
    for (var i = 0; i < chars.length; i++) {
      if (chars[i].isAlive()) {
        aliveChars.push(chars[i]);
      }
    }
    return aliveChars;
  };
  self.getChar = function(index) { return chars[index]; };
  self.getChars = function() { return chars; };
  self.getConsumables = function() { return consumables; };
  self.getGold = function() { return gold; };
  self.getKeyItems = function() {
    var keyItemsInInventory = [];
    $.each(Equipment.KeyItem.All, function(name, keyItem) {
      if (self.hasKeyItem(name)) {
        keyItemsInInventory.push(keyItem);
      }
    });
    return keyItemsInInventory;
  };
  self.getLitOrbs = function() { return orbsLit; };
  self.getMap = function() { return Map.lookup(currentMap); };
  self.getShop = function() { return currentShop; };
  self.getTransportation = function() { return currentTransportation; };
  self.getWorldMapPosition = function() { return worldMapPosition; };
  self.hasEnoughGoldFor = function(amount) { return gold >= amount; };
  self.hasKeyItem = function(name) { return !!(parseInt(keyItems, 36) & Equipment.KeyItem.lookup(name).index); };
  self.init = function(opt) {
    Event.listen(Event.Types.Moving, self.isDestinationPassable);
  };
  self.isDestinationPassable = function(yChange, xChange) {
    var map = self.getMap();
    // Keep the old position around in case we moved somewhere we can't go
    var oldPos = MapCoordsAbsolute.create(currentPosition);

    // Temporarily change the current position to the potential new position
    currentPosition.adjust(yChange, xChange, map);
    Logger.debug("moving to " + currentPosition.toString());

    // See if the new position contains a transition (i.e. entering a town/dungeon)
    // if so, move the party, then the callback will fire, transitioning them to the
    // new destination
    if (isNewPositionTransition()) {
      moveToPosition(xChange, yChange);
      return;
    }

    // Check if the new destinations is passable
    var passable = map.isPassable(currentPosition.y, currentPosition.x, currentTransportation);
    Logger.debug(currentPosition.toString() + " is" + (passable ? "" : " not") + " passable");
    if (!passable) {
      currentPosition = oldPos;
      return;
    }

    if (map.tileCanHaveBattle(currentPosition)) {
      stepsUntilBattle--;
      if (stepsUntilBattle <= 0) {
        // TODO: this should happen in the movement callback
        enterBattle();
      }
      Logger.debug("# steps till battle=" + stepsUntilBattle + " - " + currentPosition.toString());
    }

    moveToPosition(xChange, yChange);
  };

  self.lightOrb = function(orb) { orbsLit.push(orb); };
  self.lookupConsumable = function(name) {
    var consumable = null;
    $.each(consumables, function(i, item) {
      if (item.name == name) {
        consumable = item;
        return true;
      }
    });
    return consumable;
  };
  self.removeKeyItem = function(name) {
    var keyItemFlags = parseInt(keyItems, 36);
    keyItemFlags = keyItemFlags & ~Equipment.KeyItem.lookup(name).index;
    keyItems = keyItemFlags.toString(36);
  };
  self.resetStepsUntilBattle = function() {
    var steps = null;
    if (self.getMap().is(MapConstants.WORLD_MAP)) {
      steps = Encounter.Steps[MapConstants.WORLD_MAP];
    } else {
      Logger.error("Player is in an unsupported map [" + currentMap + "]");
    }

    if (steps) {
      stepsUntilBattle = RNG.randomUpTo(steps.max, steps.min);
    }
  };
  self.setCurrentMap = function(map) { currentMap = map; return this; };
  self.setCurrentShop = function(shop) { currentShop = shop; return this; };
  self.setPosition = function(coords) { currentPosition = $.extend({}, coords); return this; };
  self.setTransportation = function(transportation) { currentTransportation = transportation; return this; };
  self.storeWorldMapPosition = function() { worldMapPosition = $.extend({}, currentPosition); };
  self.useConsumable = function(item) { self.addConsumable(item, -1); return this; };

  return this;
}).call({})
});