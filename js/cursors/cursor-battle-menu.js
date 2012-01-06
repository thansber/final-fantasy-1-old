define(
/* CursorBattleMenu */ 
["jquery", "battle", "battle-commands", "cursor", "events", "key-press-notifier", "logger", "constants/cursor"],
function($, Battle, BattleCommands, Cursor, Event, KeyPressNotifier, Logger, CursorConstants) {
  
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
      KeyPressNotifier.clearListener();
      Battle.prevChar();
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
      BattleCommands.party({action:BattleCommands.Drink, source:BattleCommands.getCurrentChar()});
      Logger.warn("drink action not supported yet");
    };
    BattleMenuCursor.prototype.fight = function() { 
      BattleCommands.party({action:BattleCommands.Attack, source:BattleCommands.getCurrentChar()});
      this.hide();
      Event.transmit(Event.Types.CursorStart, CursorConstants.BATTLE_ENEMIES, {prevListener:this});
    };
    BattleMenuCursor.prototype.item = function() {
      BattleCommands.party({action:BattleCommands.UseItem, source:BattleCommands.getCurrentChar()});
      Logger.warn("item action not supported yet");
    };
    BattleMenuCursor.prototype.magic = function() {
      var currentChar = BattleCommands.getCurrentChar();
      if (!currentChar.canUseMagic()) {
        KeyPressNotifier.setListener(this);
        return;
      }
      BattleCommands.party({action:BattleCommands.CastSpell, source:currentChar});
      Event.transmit(Event.Types.CursorStart, CursorConstants.BATTLE_SPELLS);
      this.hide();
    };
    BattleMenuCursor.prototype.run = function() {
      BattleCommands.party({action:BattleCommands.Run, source:BattleCommands.getCurrentChar(), target:{type:BattleCommands.Party}});
      this.clear();
      Battle.nextChar();
    };
  };
  
  return {
    setup : setup
  };
});