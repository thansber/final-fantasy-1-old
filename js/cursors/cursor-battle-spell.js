define(
/* CursorBattleSpell */ 
["jquery", "battle", "battle-commands", "cursor", "events", "logger", "party", "spells", "constants/cursor"],
function($, Battle, BattleCommands, Cursor, Event, Logger, Party, Spell, CursorConstants) {
  
  var setup = function() {
    /* -------------------- */
    /* BATTLE SPELLS cursor */
    /* -------------------- */
    var BattleSpellCursor = function() {};
    BattleSpellCursor.prototype = Cursor.create(CursorConstants.BATTLE_SPELLS, {container: "#battle .input .spells"});
    BattleSpellCursor.prototype.back = function() {
      this.clear();
      this.toggleSpellList(false);
      Event.transmit(Event.Types.CursorStart, CursorConstants.BATTLE_MENU, {reset:false});
    };
    BattleSpellCursor.prototype.hideSpellList = function() { this.$container.addClass("hidden"); };
    BattleSpellCursor.prototype.initialCursor = function() {
      var $levels = this.$container.find(".spell.level");
      var $spell = $levels.find(".spell").eq(0);
      if ($levels.index($spell.closest(".level")) > 3) {
        $levels.slice(0, 4).toggleClass("hidden");
      }
      return $spell;
    };
    BattleSpellCursor.prototype.next = function() {
      if (this.selectSpell()) {
        this.toggleSpellList(false);
        this.clear();
        Battle.nextChar();
      }
    };
    BattleSpellCursor.prototype.reset = function(fullReset) { fullReset ? Battle.populateSpellList() : this.toggleSpellList(true); };
    BattleSpellCursor.prototype.rowChanged = function(y) {
      var $level = this.$cursor.closest(".level");
      var $levels = this.$container.find(".level");
      var levelIndex = $levels.index($level);
      var $spells = $level.find(".spell");
      var spellIndex = $spells.index(this.$cursor);
      
      var $newSpells = [];
      var newLevelIndex = levelIndex;
      var newSpellIndex = spellIndex;
      
      while ($newSpells.length <= 0) {
        newLevelIndex += y;
        if (newLevelIndex < 0 || newLevelIndex >= $levels.length) {
          newLevelIndex = levelIndex;
        } 
        $newSpells = $levels.eq(newLevelIndex).find(".spell");
      }
      
      if (newLevelIndex == levelIndex) {
        return this.$cursor;
      }
      
      if (newSpellIndex >= $newSpells.length) {
        newSpellIndex = $newSpells.length - 1;
      }
      
      if (newLevelIndex < 4 && levelIndex >= 4 || newLevelIndex >= 4 && levelIndex < 4) {
        $levels.slice(0, 4).toggleClass("hidden");
      }
      
      return $newSpells.eq(newSpellIndex);
    };
    BattleSpellCursor.prototype.selectCharAsTarget = function(char) {
      BattleCommands.party({target:{type:BattleCommands.Party, char:char}});
      this.clear();
      Battle.nextChar();
    };
    BattleSpellCursor.prototype.selectSpell = function() {
      if (!(this.$cursor) || this.$cursor.length == 0) {
        return false;
      }
      
      var $level = this.$cursor.closest(".level");
      var $levels = this.$container.find(".level");
      var levelIndex = $levels.index($level);
      var spellIndex = $level.find(".spell").index(this.$cursor);
      var char = Party.getChar(BattleCommands.getCharIndex());
      var spellId = char.knownSpells[levelIndex][spellIndex]; 
      var spell = Spell.lookup(spellId);
      if (char.canCastSpell(spell)) {
        BattleCommands.party({spellId:spellId});

        var target = null;
        
        if (spell.isSingleTarget()) {
          this.hide();
          this.hideSpellList();
          if (spell.isSameTargetGroup()) {
            Event.transmit(Event.Types.CursorStart, CursorConstants.BATTLE_PARTY, {prevListener:this});
            return false;
          } else if (spell.isOtherTargetGroup()) { 
            Event.transmit(Event.Types.CursorStart, CursorConstants.BATTLE_ENEMIES, {prevListener:this}); 
            return false;
          }
        } else if (spell.isSelfTarget()) {
          target = {type:BattleCommands.Party, char:char};
        } else {
          if (spell.isSameTargetGroup()) { 
            target = {type:BattleCommands.Party, affects:BattleCommands.All}; 
          } else if (spell.isOtherTargetGroup()) { 
            target = {type:BattleCommands.Enemy, affects:BattleCommands.All};
          }
        }
        
        if (target) {
          BattleCommands.party({target:target});
        }
        return true;
      }
      
      return false;
    };
    BattleSpellCursor.prototype.toggleSpellList = function(shown) { this.$container.toggleClass("hidden", !shown); };
    BattleSpellCursor.prototype.xDestinations = function() { return this.$cursor.closest(".level").find(".spell"); };
  };
  
  return {
    setup : setup
  };
});