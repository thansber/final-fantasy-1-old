define(
/* CursorMenuMagic */ 
["jquery", "character", "cursor", "events", "logger", "constants/cursor", "constants/party"],
function($, Character, Cursor, Event, Logger, CursorConstants, PartyConstants) {
  
  var setup = function() {
    /* ----------------- */
    /* MAGIC MENU cursor */
    /* ----------------- */
    var MagicMenuCursor = function() {};
    MagicMenuCursor.prototype = Cursor.create(CursorConstants.MAGIC_MENU, {container: "#magicMenu .magic", otherKeys:{}});
    MagicMenuCursor.prototype.back = function() { 
      this.clear();
      Event.transmit(Event.Types.SwitchView, PartyConstants.Views.MENU);
      
      if (this.previousListener) {
        var cursorStartOpt = {
          cursor : this.previousListener
         ,prevListener : this.previousListener.previousListener
         ,reset : false
        };
        Event.transmit(Event.Types.CursorStart, null, cursorStartOpt);
      }
    };
    MagicMenuCursor.prototype.initialCursor = function() { return this.$container.find(".spell").eq(0); };
    MagicMenuCursor.prototype.xDestinations = function() { return this.$cursor.closest(".spells").find(".spell"); };
    MagicMenuCursor.prototype.yDestinations = function() { 
      var indexInLevel = this.xDestinations().index(this.$cursor);
      // Yeah this is some crazy selection, but it works
      return this.$container.find(".spell:nth-child(3n - " + (Character.MAX_SPELLS_PER_LEVEL - 1 - indexInLevel) + ")");
    };
  };
  
  return {
    setup : setup
  };
});