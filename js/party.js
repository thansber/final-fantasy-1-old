define( /* Party */
["jquery",
 "character", "character-class", "character-growth", "encounters", "equipment", "events",
 "logger", "maps/map", "maps/artist", "constants/map", "maps/transition", "constants/movement",
 "rng", "spells", "util"],
function($, Character, CharacterClass, CharacterGrowth, Encounter, Equipment, Event,
         Logger, Map, MapArtist, MapConstants, MapTransition, MovementConstants,
         RNG, Spell, Util) {
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
  var inRoom = false;

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

  var $sprite = null;
  var spriteDirs = ["up", "down", "left", "right"];

  var LOG_ID = "Party";

  /* =============== */
  /* PRIVATE METHODS */
  /* =============== */
  var enterBattle = function() {
    var tileCoords = currentPosition.toTile(self.getMap());
    var encounter = Encounter.random(currentMap, tileCoords.tilesetX + "-" + tileCoords.tilesetY);
    Event.transmit(Event.Types.StartBattle, encounter, self.getMap().background);
    inBattle = true;
  };

  var isNewPositionTransition = function() {
    var transition = MapTransition.lookup(currentMap, currentPosition);

    var movementCallback = null;
    // Transition check needs to be first since we can get a null mapping when we leave a town
    if (!!transition) {
      if (transition.backToWorldMap) {
        transition.toCoords = new Map.Coords(worldMapPosition);
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
    Event.animate(Event.Animations.CharWalking).using({$player:$sprite, xChange:xChange, yChange:yChange}).start();
    MapArtist.moveOneSquare({map:self.getMap(), position:currentPosition, x:xChange, y:yChange, inRoom:inRoom});
  };

  // Checks if party is entering/leaving a room
  var roomTransition = function(yChange, xChange, oldPos) {
    if (yChange < 0) {
      // if the party is moving north
      var newTile = self.getMap().getTile(currentPosition.y, currentPosition.x);
      // and the new tile is a door, the party is entering a room
      if (newTile.allowsRoomEntry) {
        Logger.debug(LOG_ID, "entering a room");
        inRoom = true;
      }
    } else if (yChange > 0) {
      // if the party is moving south
      var oldTile = self.getMap().getTile(oldPos.y, oldPos.x);
      // and the old tile was a door, the party is leaving a room
      if (oldTile.allowsRoomEntry) {
        Logger.debug(LOG_ID, "leaving a room");
        inRoom = false;
      }
    }
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
    $sprite = $("#map .player");
    Event.listen(Event.Types.Moving, self.isDestinationPassable);
  };
  self.isDestinationPassable = function(yChange, xChange) {
    var map = self.getMap();
    // Keep the old position around in case we moved somewhere we can't go
    var oldPos = new Map.Coords(currentPosition);

    // Temporarily change the current position to the potential new position
    currentPosition.adjust(yChange, xChange, map);
    Logger.debug(LOG_ID, "moving to " + currentPosition.toString());

    // See if the new position contains a transition (i.e. entering a town/dungeon)
    // if so, move the party, then the callback will fire, transitioning them to the
    // new destination
    if (isNewPositionTransition()) {
      moveToPosition(xChange, yChange);
      return;
    }

    // Check if the new destinations is passable
    var passable = map.isPassable(currentPosition.y, currentPosition.x, currentTransportation);
    Logger.debug(LOG_ID, currentPosition.toString() + " is" + (passable ? "" : " not") + " passable");
    if (!passable) {
      currentPosition = oldPos;
      return;
    }

    roomTransition(yChange, xChange, oldPos);

    if (map.tileCanHaveBattle(currentPosition)) {
      stepsUntilBattle--;
      if (stepsUntilBattle <= 0) {
        // TODO: this should happen in the movement callback
        enterBattle();
      }
      Logger.debug(LOG_ID, "# steps till battle=" + stepsUntilBattle + " - " + currentPosition.toString());
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
      Logger.error(LOG_ID, "Player is in an unsupported map [" + currentMap + "]");
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
  self.updateSprite = function() {
    var chars = self.getChars();
    if (chars.length === 0) {
      Logger.warn(LOG_ID, "there are 0 chars in the party, wtf are you doing?");
    }
    var charClasses = Object.keys(CharacterClass.All);
    $sprite.removeClass(charClasses.join(" ")).addClass(chars[0].currentClass.name);
    self.updateSpriteDir("down");
  };
  self.updateSpriteDir = function(dir) {
    $sprite.removeClass(spriteDirs.join(" ")).addClass(dir);
  };
  self.useConsumable = function(item) { self.addConsumable(item, -1); return this; };

  return this;
}).call({})
});