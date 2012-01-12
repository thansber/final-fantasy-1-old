define(
/* CursorBattleMenu */ 
["jquery", "battle", "battle-commands", "constants/battle", "cursor", "constants/cursor", "events", "key-press-notifier", "logger"],
function($, Battle, BattleCommands, BattleConstants, Cursor, CursorConstants, Event, KeyPressNotifier, Logger) {
  
  var setup = function() {
    /* ------------------ */
    /* BATTLE MENU cursor */
    /* ------------------ */
    var BattleMenuCursor = function() {};
    var battleMenuCursorOpt = {container: "#battle .input .commands", otherKeys:{}};
    battleMenuCursorOpt.otherKeys[KeyPressNotifier.F] = function() { this.fight(); };
    battleMenuCursorOpt.otherKeys[KeyPressNotifier.M] = function() { this.magic(); };
    battleMenuCursorOpt.otherKeys[KeyPressNotifier.D] = function() { this.drink(); };
    battleMenuCursorOpt.otherKeys[KeyPressNotifier.I] = function() { this.item(); };
    battleMenuCursorOpt.otherKeys[KeyPressNotifier.R] = function() { this.run(); };
    
    BattleMenuCursor.prototype = Cursor.create(CursorConstants.BATTLE_MENU, battleMenuCursorOpt);
    BattleMenuCursor.prototype.back = function() {
      this.clear();
      Event.transmit(Event.Types.PrevChar);
    };
    BattleMenuCursor.prototype.columnChanged = function(y) {
      var $columns = this.$container.find(".column");
      var $column = this.$cursor.closest(".column");
      var index = $columns.index($column);
      index = Math.abs(index + y) % $columns.length;
      return $columns.eq(index).find(".text").eq(0);
    };
    BattleMenuCursor.prototype.initialCursor = function() { return this.$container.find(".text").eq(0); };
    BattleMenuCursor.prototype.next = function() {
      if (this.$cursor.is(".fight")) { this.fight(); } 
      else if (this.$cursor.is(".magic")) { this.magic(); }
      else if (this.$cursor.is(".drink")) { this.drink(); } 
      else if (this.$cursor.is(".item")) { this.item(); } 
      else if (this.$cursor.is(".run")) { this.run(); }
    };
    BattleMenuCursor.prototype.yDestinations = function() { return this.$cursor.closest(".column").find(".text"); };
    
    BattleMenuCursor.prototype.drink = function() {
      BattleCommands.party({
        source : BattleCommands.currentChar(),
        action : BattleConstants.Actions.Drink
      });
      Logger.warn("drink action not supported yet");
    };
    BattleMenuCursor.prototype.fight = function() { 
      BattleCommands.party({
        source : BattleCommands.currentChar(),
        action : BattleConstants.Actions.Attack
      });
      this.hide();
      Event.transmit(Event.Types.CursorStart, CursorConstants.BATTLE_ENEMIES, {prevListener:this});
    };
    BattleMenuCursor.prototype.item = function() {
      BattleCommands.party({
        source : BattleCommands.currentChar(),
        action : BattleConstants.Actions.UseItem 
      });
      Logger.warn("item action not supported yet");
    };
    BattleMenuCursor.prototype.magic = function() {
      var currentChar = BattleCommands.currentChar();
      if (!currentChar.canUseMagic()) {
        KeyPressNotifier.setListener(this);
        return;
      }
      BattleCommands.party({
        source : currentChar,
        action : BattleConstants.Actions.CastSpell
      });
      Event.transmit(Event.Types.CursorStart, CursorConstants.BATTLE_SPELLS);
      this.hide();
    };
    BattleMenuCursor.prototype.run = function() {
      BattleCommands.party({
        source : BattleCommands.currentChar(), 
        action : BattleConstants.Actions.Run, 
        target : {type:BattleCommands.Party}
      });
      this.clear();
      Event.transmit(Event.Types.NextChar);
    };
  };
  
  return {
    setup : setup
  };
});