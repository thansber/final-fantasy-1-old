define(
/* CursorBattleParty */ 
["jquery", "cursor", "events", "logger", "party", "constants/cursor"],
function($, Cursor, Event, Logger, Party, CursorConstants) {
  
  var setup = function() {
    /* ------------------- */
    /* BATTLE PARTY cursor */
    /* ------------------- */
    var BattlePartyCursor = function() {};
    BattlePartyCursor.prototype = Cursor.create(CursorConstants.BATTLE_PARTY, {container: "#battle .party"});
    BattlePartyCursor.prototype.back = function() {
      this.clear();
      Event.transmit(Event.Types.CursorStart, null, {cursor:this.previousListener, reset:false});
    }; 
    BattlePartyCursor.prototype.initialCursor = function() { return this.yDestinations().eq(0); };
    BattlePartyCursor.prototype.next = function() { 
      var char = Party.getChar(this.yDestinations().index(this.$cursor));
      this.clear();
      this.previousListener.selectCharAsTarget(char);
    };
    BattlePartyCursor.prototype.yDestinations = function() { return this.$container.find(".char"); };
  };
  
  return {
    setup : setup
  };
});